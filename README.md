"# plantproject" 
下面我将整个实现过程进行分析：
服务器：阿里云
主控:树莓派3b stm32f103
原理：
①传感器收集数据-》esp8266--》中继wifi---》http协议上传到树莓派django后台（简单处理数据并控制一些继电器，然后提供接口给总后台访问）---》springboot单体后台（负责调度任务，处理数据，写入数据库，提供接口给前端访问）
②传感器收集数据-》stm32--》esp8266--》中继wifi---》http协议上传到树莓派django后台---》springboot单体后台（负责调度任务，处理数据，写入数据库，提供接口给前端访问）

第一步：我们要考虑路由的问题。首先树莓派要设置成静态ip否则无法内网穿透，为什么要内网穿透？通常个人电脑无论是连接WIFI上网还是用网线上网，都是属于局域网里边的，外网无法直接访问到你的电脑，内网穿透可以让你的局域网中的电脑实现外网访问功能。
由于动态地址与路由器有关，因此设置一个静态IP可以让我们更方便的连接树莓派。
首先打开树莓派的命令行，输入：
sudo vi /etc/dhcpcd.conf
即可用vi编辑配置文件。 
在文件末尾输入：

interface eth0

static ip_address=192.168.0.10/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1

interface wlan0

static ip_address=192.168.1.188/24
static routers=192.168.1.1
static domain_name_servers=192.168.1.1
然后 sudo reboot
第二步：
花生壳内网穿透并设置自启动


第三步：树莓派django后台搭建：文件在plantwebpy-master文件夹（manage.py是启动文件）直接运行命令
python3 你的路径/manage.py runserver 192.168.1.188:8080
后台运行命令nohup python3 你的路径/manage.py runserver 192.168.1.188:8080 > /dev/null 2>&1 &

到此你的django已经可以在外网访问

第四步：刷esp8266固件让传感器数据上传到django后台，当然我还刷了一个中继esp8266，否则，你的esp8266换到另一个地方就无法传数据了。中继wifi可以通过http来动态配置基站网络。具体看esp8266这个文件夹。






