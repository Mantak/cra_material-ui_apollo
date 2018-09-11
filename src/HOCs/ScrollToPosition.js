// based on: https://reacttraining.com/react-router/web/guides/scroll-restoration
import React from 'react';
import { withRouter } from 'react-router-dom';

@withRouter
class ScrollToPosition extends React.Component<*> {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname === prevProps.location.pathname) return;

    // exception for when entering or exiting document edit, scroll postion should not reset

    const curHash = this.props.location.hash;
    const prevHash = prevProps.location.hash;
    const curPath = this.props.location.pathname;
    const prevPath = prevProps.location.pathname;

    // 编辑状态不处理
    if (curPath.match(/\/edit\/?$/) || prevPath.match(/\/edit\/?$/)) return;
    // 如果路径锚点都没变，不处理
    if (curHash === prevHash && curPath === prevPath) return;
    // 如果锚点为空，则跳转到顶部
    if (window.location.hash === '') {
      window.scrollTo(0, 0);
      return;
    }
    // 有锚点，就跳转到锚点
    setImmediate(() => {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    });
  }

  render() {
    return this.props.children;
  }
}

export default ScrollToPosition;
