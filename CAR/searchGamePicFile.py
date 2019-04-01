# -*- coding: UTF-8 -*-
#!/usr/bin/python3
#   

import os;
import shutil
import json

def listPath(path):
    Filelists=os.listdir(path)
    for file in Filelists:
        print (file)
    return Filelists

def listDir(path):
    dirList=[];
    # path -size
    fileList=[];
    for dirpath,dirnames,filenames in os.walk(path):
        # print(dirpath,dirnames,filenames)
        for filename in filenames:
            file_path=os.path.join(dirpath,filename)
            file_size=os.path.getsize(file_path)
            file_info=[]
            file_info.append(file_path)
            file_info.append(file_size)
            fileList.append(file_info)
 
        dirList.append(dirpath)
    # for dir in dirList:
    #     print(dir)

    return fileList

def FilterImage(file_path):
    # print("FilterImage:"+file_path)
    dstFileList=[];
    ImageType=[".png",".jpeg",".jpg"];

    path_split=os.path.splitext(file_path) 
    if path_split[1] in ImageType:
        print(path_split)
        return True
    else:
        return False

def FilterImageList(file_path_list):
    # print("FilterImage:"+file_path)
    dstFileList=[];
    ImageType=[".png",".jpeg",".jpg"];

    for file_path in file_path_list:
        path_split=os.path.splitext(file_path[0]) 
        if path_split[1] in ImageType:
            dstFileList.append(file_path)
    return dstFileList;

 # 获取列表的第二个元素
def takeSecond(elem):
    return elem[1]

def ShowFileInfo(file_info):
    # print(" %s %d kb"%(name,size/1024))
    print(" %s %d kb"%(file_info[0],file_info[1]/1024))

def ShowFileInfoList(file_info_list):
    
    for file_info in file_info_list: 
        # print(" %s %d kb"%(name,size/1024))
        print(" %s %d kb"%(file_info[0],file_info[1]/1024))

def check_project_set( ):
    # 读取json配置文件    
    print (" start check_project_set")

    # 读取数据
    with open('MiniGameProjectSet.json', 'r') as f:
        data = json.load(f)
    print (data)
    # print (" data['developer']: "+data['developer'])

    if((data['developer']=='')or(data['project_name']=='')or(data['res_path']=='')):
        print (" MiniGameProjectSet.json  Error ! check file content  " )
        print (" data['developer']: "+data['developer'])
        print (" data['project_name']: "+data['project_name'])
        print (" data['res_path']: "+data['res_path'])
        data=None;

    return data

def check_res_image(image_path):

    fileList=listDir(image_path)
    # ShowFileInfoList(fileList)
    
    image_list=FilterImageList(fileList)
    # ShowFileInfoList(image_list)

    # 指定第二个元素排序
    image_list.sort(key=takeSecond,reverse = True)
    # 排序列表=
    limit_show_image_count=200
    for i in range(len(image_list)):
        ShowFileInfo(image_list[i])
        if i>limit_show_image_count:
            break



def mainFun():


    json_data=check_project_set()

    if(json_data!=None):
        
        if(json_data["scanning_assets_image"]):
            res_abs_path=os.path.join(os.getcwd(),json_data["assets_path"])
            if( os.path.exists(res_abs_path) ):
                print ( " 按大小顺序显示 "+json_data["assets_path"]+"  图片")
                check_res_image(res_abs_path)
            else:
                print ("  扫描 error  not exist "+res_abs_path)
        else:
            print (" 跳过扫描 assets中image资源 ")

    else:
        print (" 无法读取配置文件中的数据")
        return -1


    
 
    # subGameSrcPath=os.path.join(os.getcwd(),"SubGame")
    # subGameDestPath=os.path.join(curPath,"SubGame")

    # #复制 排行榜文件夹
    # copyDirToPath(subGameSrcPath,subGameDestPath)

 

mainFun()



# mainFun()


def copyDirToPath(srcPath,destPath):
    #复制文件夹
    if(os.path.exists(srcPath)==False):
        print(srcPath+' not exist ,can not copy')
        return ;
    else:
        if (os.path.exists(destPath)==True):
            print(destPath+'  is exist , del dir')
            shutil.rmtree(destPath)

    print ('copy dir began...')
    print (srcPath+'拷贝 =>'+destPath)

    shutil.copytree(srcPath, destPath)

    print ('copy dir end...')

def copyGameJSToPath(JSfile_list):
    #拷贝 指定js文件到 wechatgame目录下
    curPath=os.path.join(os.getcwd(),'wechatgame')

    #检查拷贝源文件是否存在
    for jsfile in JSfile_list:
        if(os.path.exists(jsfile)==False):
            print (' file not exists'+jsfile)
            return ;

    #删除目标路径下的文件  拷贝文件进入
    for jsfile in JSfile_list:
        file_path=os.path.join(curPath,jsfile)
        if(os.path.exists(file_path)):
            os.remove(file_path)
            print ("del js "+file_path)
        shutil.copyfile(jsfile,file_path)
        print ("copy js "+jsfile)

def delFileList2code(delFileList):
    
    for file in delFileList:
        keyword=os.path.join('build','wechatgame') 
        # keyword=os.path.join('build','wechatgame','res','raw-assets','resources','ch') 
        pos=file.find(keyword)
        
        if(pos!=-1):
            # os.remove(dirFile)
            pass
            #wechatgame
            # fileName=file[pos+len(keyword)+1:]
            # print (" { url:"+fileName+"},")


       

# def delDirFile(dirPath):
#     #删除文件夹中所有文件
#     delFileList=[];
#     if(os.path.exists(dirPath)):
#         Filelists=os.listdir(dirPath)
#         print ("delDirFile: ")
#         for file in Filelists:
#             chFile=dirPath+'/'+file
#             if(os.path.exists(chFile)):
#                 os.remove(chFile)
#                 delFileList.append(chFile)
#                 print ("del "+chFile)          
#         os.rmdir(dirPath)
#     else:
#         print ("not exist  "+dirPath)
#     return delFileList

