import React from "react";

const Docs: React.FC = () => {

  // 定义代码块的内联样式
  const codeStyle = {
    backgroundColor: '#333', // 设置背景色为深灰/黑色
    color: '#f8f8f2', // 设置文字颜色，这里使用浅灰色，类似于许多代码编辑器的默认颜色
    border: '1px solid #555', // 可选，为代码块添加边框
    padding: '10px', // 内边距
    fontFamily: 'Consolas, "Courier New", monospace', // 设置等宽字体
    borderRadius: '4px', // 圆角边框
    overflowX: 'auto' // 超出部分滚动
  } as React.CSSProperties;

  return (
    <>
      <h1>接口脚本说明</h1>
      <p>接口脚本是基于<a href="https://www.w3cschool.cn/groovy/groovy_basic_syntax.html">Groovy</a>的开发的脚本语言，支持对当前提交考核内容的数据校验控制。</p>

      <h2>接口对象说明</h2>

      <h3>1. $request 对象</h3>
      <pre style={{ ...codeStyle }}>
        <code>
          {`
        // 获取参数name的值，如果参数不存在，则返回默认值
        var name = $request.getParameter("name","");
        // 获取分页对象
        var pageRequest = $request.pageRequest(0,10);
        // 获取分页对象的页码
        var pageNumber = pageRequest.getPageNumber();
        // 获取分页对象的每页记录数
        var pageSize = pageRequest.getPageSize();
        // 获取分页对象的偏移量
        var offset = pageRequest.getOffset();
          `}
        </code>
      </pre>

      <h3>2. $jdbc 对象</h3>
      <pre style={{ ...codeStyle }}>
        <code>
          {`
        // 查询jdbcSQL $jdbc.queryForList({sql},{params})

        // 查询无条件的数据
        var res = $jdbc.queryForList("select * from api_mapping");
        // 查询有条件的数据
        var res = $jdbc.queryForList("select * from api_mapping where name = ?",name);
        // 查询多条件的数据
        var res = $jdbc.queryForList("select * from api_mapping where name = ? and url = ?",name,url);

        // 分页查询 $jdbc.queryForPage({sql},{countSql},{pageRequest},{params})
        var res = $jdbc.queryForPage("select * from api_mapping where name = ? and url = ?",
        "select count(1) from api_mapping where name = ? and url = ?",pageRequest,params.toArray());
         `}
        </code>
      </pre>

      <h3>3. $jpa 对象</h3>
      <pre style={{ ...codeStyle }}>
        <code>
          {`
        // 查询jpa $jpa.listQuery({clazz},{sql},{params})

        // 查询无条件的数据
        var res = $jpa.listQuery(com.example.entity.NodeEntity.class,"from NodeEntity");
        // 查询有条件的数据
        var res = $jpa.listQuery(com.example.entity.NodeEntity.class,"from NodeEntity where name = ?",name);
         `}
        </code>
      </pre>


      <h2>演示脚本</h2>

      <h3>1.动态条件查询</h3>
      <pre style={{ ...codeStyle }}>
        <code>
          {`
        // 获取name的请求参数
        var name = $request.getParameter("name","");
        // 动态组织sql
        String sql = "select * from api_mapping where 1=1 ";
        // 动态组织参数
        var params = [];
        if(!"".equals(name)){
            sql += " and name = ? ";
            params.add(name);
        }
        // 执行查询
        return $jdbc.queryForList(sql,params.toArray());
       `}
        </code>
      </pre>

      <h3>2.分页动态条件查询</h3>
      <pre style={{ ...codeStyle }}>
        <code>
          {`
        // 获取name的请求参数
        var name = $request.getParameter("name","");
        var pageNumber = $request.getParameter("pageNumber",0);
        var pageSize = $request.getParameter("pageSize",10);
        // 创建分页对象
        var pageRequest = $request.pageRequest(pageNumber,pageSize);
        // 动态组织sql
        var sql = "select * from api_mapping where 1 =1 ";
        var countSql = "select count(1) from api_mapping where 1 =1 ";
        // 动态组织参数
        var params = [];
        if(!"".equals(name)){
           sql += " and name = ? ";
           countSql += " and name = ? ";
           params.push(name);
        }
        sql += " limit ?,?";
        // 添加分页参数
        params.add(pageRequest.getOffset());
        params.add(pageRequest.getPageSize());
        // 执行分页查询
        return $jdbc.queryForPage(sql,countSql,pageRequest,params.toArray());
       `}
        </code>
      </pre>
    </>
  )
}

export default Docs;
