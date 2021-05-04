
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
options.add_argument("headless")
options.add_argument("window-size=1920x1080")
options.add_argument("--log-level=3")
options.add_argument("disable-gpu")

driver = webdriver.Chrome("./driver/chromedriver.exe", chrome_options = options)
driver.set_window_size(1280, 1080)
driver.implicitly_wait(10)

# login waiting
driver.get("https://mhaksa.ajou.ac.kr:30443/index.html")
userid = driver.find_element_by_css_selector("input[id=userId]")
userpw = driver.find_element_by_css_selector("input[id=password]")

#get user id / pw from login page
user_id = sys.argv[1] #temp id

#pw_f = open("./scripts/pw.txt", "r") #temp pw
user_pw = sys.argv[2]
#pw_f.close()

userid.send_keys(user_id)
userpw.send_keys(user_pw)
driver.find_element_by_class_name("btn-login").click()
# time.sleep(1)
# driver.find_element_by_link_text("확인").click()

result = WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.CSS_SELECTOR, '.nb-paging-blocks')))

# get table data
driver.find_element_by_css_selector(".tab-header ul li").click()
time.sleep(2)
driver.find_element_by_xpath("(//div[@class='left-nav-lists']/div[@class='ng-scope'])[2]").click()
time.sleep(2)

driver.find_element_by_link_text("수강신청결과/시험시간표조회").click()
time.sleep(2)

driver.find_element_by_xpath("//button[text()='검색']").click()

time.sleep(2)
table = driver.find_element_by_xpath("(//div[@class='sp-grid-row-group ng-scope'])[2]")
time.sleep(2)
eles = table.find_elements_by_xpath(".//span[@class='sp-grid-data-view']/span")
time.sleep(2)

table_col = 11
table_row = int(len(eles) / table_col)
#print("{} courses found.".format(table_row))

acts = {"activities" : []}

for i in range(table_row):
    act = {'name' : '', 'classdate' : [], 'start' : [], 'alarm' : 'Y'}
    for j in range(table_col):
        if(j == 2):
            act['name'] = eles[i*table_col + j].get_attribute("innerHTML")
        if(j == 6):
            times = eles[i*table_col + j].get_attribute("innerHTML")
            one, two = times.split(' ')
            act['classdate'].append(one[0])
            act['classdate'].append(two[0])
            act['start'].append(one[1])
            act['start'].append(two[1])
    acts['activities'].append(act)

with open('time_table.json', 'w', encoding='utf-8') as make_file:
    json.dump(acts, make_file, indent=4, ensure_ascii=False)

# get ajouBB stream data
driver.get("https://eclass2.ajou.ac.kr/ultra/stream")

result = WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.CLASS_NAME, 'btn-login')))
userid = driver.find_element_by_css_selector("input[id=userId]")
userpw = driver.find_element_by_css_selector("input[id=password]")

userid.send_keys(user_id)
userpw.send_keys(user_pw)
driver.find_element_by_class_name("btn-login").click()
# time.sleep(1)

# driver.find_element_by_link_text("확인").click()

time.sleep(3)

driver.find_element_by_xpath("(//span[@class='link-text'])[2]").click()
time.sleep(2)
driver.find_element_by_id("filter-stream-value").click()
driver.find_element_by_link_text("과제 및 시험").click()
time.sleep(1)

streams = driver.find_elements_by_class_name("stream-item-contents")
stream_num = len(streams)
#print("{} streams found.".format(stream_num))

f = open("stream.txt", 'w', encoding='utf-8')

for stream in streams:
    f.write(stream.find_element_by_xpath(".//div[@class='timestamp']/div/div/span[@class='date']").get_attribute("innerHTML")+ " ")
    f.write(stream.find_element_by_xpath(".//div[@class='timestamp']/div/div/span[@class='time']").get_attribute("innerHTML")+ " ")
    f.write(stream.find_element_by_xpath(".//div[@class='context ellipsis']/a").get_attribute("innerHTML")+ " ")
    f.write(stream.find_element_by_xpath(".//div[@class='name']/ng-switch/a").get_attribute("innerHTML") + " ")
    f.write(stream.find_element_by_xpath(".//div[@class='content']/span/bb-translate/bdi").get_attribute("innerHTML") + "\n")
f.close()

driver.close()
driver.quit()

print('success')