import { list, save, del, test } from '@/services/api/api';
import { ApiPage } from 'coding-components';
import { PageContainer } from '@ant-design/pro-components';

const MyPage = () =>{
  return (
    <PageContainer>

      <ApiPage
        list={list}
        save={save}
        del={del}
        test={test}
      />
    </PageContainer >
  );
};

export default MyPage;
