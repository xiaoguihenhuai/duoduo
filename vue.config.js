module.exports = {
  devServer :{
      proxy:{
          '/api':{
              target :'https://zipcloud.ibsnet.co.jp',
              changeOrigin:true
          },
          '/api':{
              target :'https://autumnfish.cn',
              changeOrigin:true,
              pathRewrite:{
                  '^/api':''
              }
          }
      }
  }
}