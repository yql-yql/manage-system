/*
 * @Date: 2022-06-20 15:43:43
 * @LastEditTime: 2022-06-27 22:24:01
 */
let baseUrl = ''; 
let routerMode = 'hash';
let baseImgPath;

if (process.env.NODE_ENV == 'development') {
	// baseUrl = '';
  // baseImgPath = '/img/';
	baseUrl = '//elm.cangdu.org';
  baseImgPath = '//elm.cangdu.org/img/';
}else{
	baseUrl = '//elm.cangdu.org';
  baseImgPath = '//elm.cangdu.org/img/';
}

export {
	baseUrl,
	routerMode,
	baseImgPath
}