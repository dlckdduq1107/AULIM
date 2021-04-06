
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time
import warnings

# headless
options = webdriver.ChromeOptions()
options.add_argument("headless")
options.add_argument("window-size=1920x1080")
options.add_argument("--log-level=3")
options.add_argument("disable-gpu")

driver = webdriver.Chrome("../driver/chromedriver.exe", chrome_options = options)
driver.set_window_size(1280, 1080)
driver.implicitly_wait(10)

# login waiting
driver.get("https://mhaksa.ajou.ac.kr:30443/index.html")
userid = driver.find_element_by_css_selector("input[id=userId]")
userpw = driver.find_element_by_css_selector("input[id=password]")

#get user id / pw from login page
user_id = "gody8756" #temp id

pw_f = open("pw.txt", "r") #temp pw
pw = pw_f.readline()
pw_f.close()

userid.send_keys(user_id)
userpw.send_keys(pw)
driver.find_element_by_class_name("btn-login").click()

result = WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.CSS_SELECTOR, '.nb-paging-blocks')))

# get table data
driver.find_element_by_css_selector(".tab-header ul li").click()

driver.find_element_by_xpath("(//div[@class='left-nav-lists']/div[@class='ng-scope'])[2]").click()
time.sleep(1)

driver.find_element_by_link_text("수강신청결과/시험시간표조회").click()
time.sleep(1)

driver.find_element_by_xpath("//button[text()='검색']").click()

time.sleep(1)
table = driver.find_element_by_xpath("(//div[@class='sp-grid-row-group ng-scope'])[2]")
time.sleep(1)
eles = table.find_elements_by_xpath(".//span[@class='sp-grid-data-view']/span")
time.sleep(1)

table_col = 11
table_row = int(len(eles) / table_col)
print("{} courses found.".format(table_row))

# write table data
f = open("time_table.txt", 'w', encoding='utf-8')

for i in range(0, len(eles)):
    f.write(eles[i].get_attribute("innerHTML")+" ")
    if(i%table_col == table_col-1):
        f.write("\n")
f.close()

# get ajouBB stream data
driver.get("https://eclass2.ajou.ac.kr/ultra/stream")

result = WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.CLASS_NAME, 'btn-login')))
userid = driver.find_element_by_css_selector("input[id=userId]")
userpw = driver.find_element_by_css_selector("input[id=password]")

pw_f = open("pw.txt", "r")
pw = pw_f.readline()
pw_f.close()

userid.send_keys("gody8756")
userpw.send_keys(pw)
driver.find_element_by_class_name("btn-login").click()
time.sleep(4)

driver.find_element_by_xpath("(//span[@class='link-text'])[2]").click()
time.sleep(2)
driver.find_element_by_id("filter-stream-value").click()
driver.find_element_by_link_text("과제 및 시험").click()
time.sleep(1)

streams = driver.find_elements_by_class_name("stream-item-contents")
stream_num = len(streams)
print("{} streams found.".format(stream_num))

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


