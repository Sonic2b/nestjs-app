
@陈林
## 用户注册
 - 增加密码加密的随机数

 - 图片验证码
 - 注册信息唯一验证（邮箱，手机号，帐号） 

### POST /signup 

@张晓辉
##  获取验证码
### GET /utils/verifycode?type=(1-code 2-sms)
##  确认验证码
### POST /users/verify?type=(1-code 2-sms)

@赵九州
## 用户登陆
### POST /signin （邮箱/手机号/帐号 +密码 + 验证码）
### GET /utils/verifycode

@songxiankun
## 修改用户信息
### PUT /users/:id (@body) 


@pujinhui
## 获取用户信息
### GET /users/:id


@sunxiaoning
## 用户注销
### POST /signout


@zhaoyiming
## TODO
## 找回密码 
### POST /password/find (@body {type: email/phone, id: 'xxx'})
### POST /password/reset  (TODO 具体实现方式待定)



