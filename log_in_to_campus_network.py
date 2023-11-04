#!/usr/bin/env python3
# -*- coding: utf-8 -*-

'''开机自动登录校园网'''

import asyncio
import pyppeteer
import requests
import time


'''需要修改的变量'''
user_name = '123456'  # 学号
pass_word = '123456'  # 密码
tmp_dir = '/tmp'  # 临时文件夹
chrome_path = '/usr/bin/google-chrome'  # chrome浏览器路径


async def loginfunction(loginUrl: str):
    start_time = time.time()
    while True:
        if time.time() - start_time > 60:
            return # 60秒内未连接到校园网，退出
        try:
            response = requests.get(loginUrl, timeout=3)
            if response.status_code == 200:
                break  # 连接到校园网，准备登录
        except KeyboardInterrupt as e:
            return # 用户中断
        except:
            pass  # 未连接到网络，继续尝试

    width, height = 1400, 800 # 窗口大小
    # 启动浏览器
    browser = await pyppeteer.launch(headless=False,
                                    userdataDir = tmp_dir,
                                    executablePath = chrome_path,
                                     args=[f'--window-size={width},{height}'])
    page = await browser.newPage() # 新建页面
    await page.setViewport({'width': width, 'height': height}) # 设置页面大小
    await page.goto(loginUrl) # 跳转到登录页面

    if await page.querySelector("body > div.success > p") != None: # 已登录
        await browser.close()
        return

    element = await page.querySelector("#username")
    await element.type(user_name) # 输入用户名
    element = await page.querySelector("#password")
    await element.type(pass_word) # 输入密码
    element = await page.querySelector("#login-account")
    await element.click() # 点击登录
    await page.waitForSelector("body > div.success > p", timeout=30000) # 等待登录页面加载完成
    await browser.close() # 关闭浏览器


def main():
    url = 'http://172.22.255.18/srun_portal_pc?ac_id=1&theme=pro'
    asyncio.get_event_loop().run_until_complete(loginfunction(url))


if __name__ == '__main__':
    main()