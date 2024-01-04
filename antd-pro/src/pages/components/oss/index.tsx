import { del, list, upload } from '@/services/api/oss';
import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import { OSSPage } from 'coding-components';

const MyPage: React.FC = () => {

  return (
    <PageContainer>
      <OSSPage
        list={list}
        upload={upload}
        del={del}
      />
    </PageContainer >
  )
};

export default MyPage;
