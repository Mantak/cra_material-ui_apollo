// 如果页面发生错误，统一处理，给用户良好的反馈信息
import React from 'react';

class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    // Error handler is often blocked by the browser
    if (window.Bugsnag) {
      window.Bugsnag.notifyException(error, { react: info });
    }
  }

  // handleReload = () => {
  // window.location.reload();
  // };

  render() {
    // const isReported = !!window.Bugsnag;
    if (this.error) return this.error.toString();
    return this.props.children;
  }
}

export default ErrorBoundary;
