import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = '小园出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'BINexus-frontend',
          title: 'BINexus-frontend',
          href: 'https://github.com/1951551170/BINexus-frontend',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/1951551170',
          blankTarget: true,
        },
        {
          key: 'BINexus-backend',
          title: 'BINexus-backend',
          href: 'https://github.com/1951551170/BINexus-backend',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
