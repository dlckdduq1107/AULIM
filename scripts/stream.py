# 활동 스트림 크롤링

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time
import warnings
import sys
import json

# headless
options = webdriver.ChromeOptions()
# options.add_argument("headless")
options.add_argument("window-size=1920x1080")
options.add_argument("--log-level=3")
options.add_argument("disable-gpu")

# driver = webdriver.Chrome("./driver/chromedriver91.exe", chrome_options = options) # 91 version driver
driver = webdriver.Chrome("./driver/chromedriver.exe", chrome_options = options) # 89 version driver
driver.set_window_size(1280, 1080)
driver.implicitly_wait(10)

driver.get("https://eclass2.ajou.ac.kr/ultra/stream")
# login waiting

userid = driver.find_element_by_css_selector("input[id=userId]")
userpw = driver.find_element_by_css_selector("input[id=password]")

#get user id / pw from login page
user_id = sys.argv[1] #temp id

#pw_f = open("./scripts/pw.txt", "r") #temp pw
user_pw = sys.argv[2]
#pw_f.close()


# get ajouBB stream data


result = WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.CLASS_NAME, 'btn-login')))

userid.send_keys(user_id)
userpw.send_keys(user_pw)
driver.find_element_by_class_name("btn-login").click()
# time.sleep(1)

# driver.find_element_by_link_text("확인").click()

time.sleep(4)
driver.find_element_by_xpath("(//span[@class='link-text'])[2]").click()
time.sleep(4)
driver.find_element_by_id("filter-stream-value").click()
driver.find_element_by_link_text("과제 및 시험").click()
time.sleep(2)

streams = driver.find_elements_by_class_name("stream-item-contents")
stream_num = len(streams)
#print("{} streams found.".format(stream_num))

f = open("./data/streams/stream_"+user_id+".txt", 'w', encoding='utf-8')

for stream in streams:
    f.write(stream.find_element_by_xpath(".//div[@class='timestamp']/div/div/span[@class='date']").get_attribute("innerHTML")+ " ")
    f.write(stream.find_element_by_xpath(".//div[@class='timestamp']/div/div/span[@class='time']").get_attribute("innerHTML")+ " ")
    f.write(stream.find_element_by_xpath(".//div[@class='context ellipsis']/a").get_attribute("innerHTML")+ " ")
    f.write(stream.find_element_by_xpath(".//div[@class='name']/ng-switch/a").get_attribute("innerHTML") + " ")
    f.write(stream.find_element_by_xpath(".//div[@class='content']/span/bb-translate/bdi").get_attribute("innerHTML") + "\n")
f.close()
driver.close()
driver.quit()


