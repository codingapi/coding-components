import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: '',
    logo: '/logo.png',
    footer: 'Open-source GLP Licensed | Copyright © 2023-present  <a target="_blank" href="https://beian.miit.gov.cn">鲁ICP备2021024622号-1</a>',
  },
  styles: [
    `.dumi-default-logo img {
      height: 35px !important;
    }`,
  ],
});
