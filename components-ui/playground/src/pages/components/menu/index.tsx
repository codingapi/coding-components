import { list, save, del, tree } from '@/services/api/menu';
import { MenuPage } from 'coding-components';
import { PageContainer } from '@ant-design/pro-components';

export default () => {

  return (
    <PageContainer>
      <MenuPage
        save={save}
        list={list}
        del={del}
        tree={tree}
      />
    </PageContainer>
  )
};

