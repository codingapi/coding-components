// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';


export async function list(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Response<any>>('/api/oss/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}



export async function upload(file: File) {
  const formData = new FormData();
  formData.append('files', file);

  return request<API.Response<any>>('/api/oss/upload', {
    method: 'POST',
    data: formData,
  });
}


export async function del(body: {
  id:string,
}, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/api/oss/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
