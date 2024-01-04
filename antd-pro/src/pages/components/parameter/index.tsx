import { list, save, del } from '@/services/api/parameter';
import { PageContainer } from '@ant-design/pro-components';
import { ParameterPage } from 'coding-components';
import React from 'react';

const MyPage: React.FC = () => {

  return (
    <PageContainer>
      <ParameterPage
        list={list}
        save={save}
        del={del} />

    </PageContainer>
  );
};

export default MyPage;
