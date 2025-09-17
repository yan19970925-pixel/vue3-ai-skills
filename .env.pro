# 生产环境
NODE_ENV=production

VITE_DEV=false

# 请求路径
#VITE_BASE_URL='http://192.168.1.31:48080'
VITE_BASE_URL='http://10.10.10.17:48080'
#VITE_BASE_URL='http://192.168.2.91:48080'
# 请求路径 基础服务
VITE_BASE_URL_INFRA='http://192.168.1.31:48082'

# 上传路径
#VITE_UPLOAD_URL='http://192.168.1.105:48079/admin-api/infra/file/upload'
VITE_UPLOAD_URL='http://192.168.1.31:48080/admin-api/infra/file/upload'
# 电子医保码接口路径
VITE_E_HEALTH_URL='http://10.85.200.100:8000/localcfc/api/hsecfc/localQrCodeQuery'


# 接口前缀
VITE_API_BASEPATH=

# 接口地址
VITE_ADMIN_API_URL=/admin-api

# 门诊医生
VITE_OUTP_API_URL=/outp-api

VITE_COMPRESSION='gzip'

# 是否删除debugger
VITE_DROP_DEBUGGER=true

# 是否删除console.log
VITE_DROP_CONSOLE=false

# 是否sourcemap
VITE_SOURCEMAP=false

# 打包路径
VITE_BASE_PATH=/fims/

# 输出路径
VITE_OUT_DIR=dist-pro
