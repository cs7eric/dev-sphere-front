import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserInfo, selectUserInfo } from '@/store/features/user/userInfoSlice';
import { Button } from '@/components/ui/button';

// 示例组件1：保存用户信息
const SaveUserInfoComponent = () => {
  const dispatch = useDispatch();
  
  // 直接保存用户信息，不需要OTP验证
  const handleSaveUserInfo = () => {
    // 用户信息
    const userInfo = {
      userName: 'testuser',
      nickName: '测试用户',
      phone: '13800138000',
      email: 'test@example.com'
    };
    
    // 使用Redux dispatch保存用户信息
    dispatch(saveUserInfo(userInfo));
    alert('用户信息已保存！');
  };

  return (
    <div className="p-4 border rounded-md mb-4">
      <h2 className="text-lg font-bold mb-2">组件1: 保存用户信息</h2>
      <p className="mb-2">点击按钮直接保存用户信息：</p>
      
      <Button 
        onClick={handleSaveUserInfo}
      >
        保存用户信息
      </Button>
    </div>
  );
};

// 示例组件2：获取用户信息
const GetUserInfoComponent = () => {
  // 使用useSelector从Redux store获取用户信息
  const userInfoState = useSelector(selectUserInfo);
  const userInfo = userInfoState?.userInfo || {};

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-bold mb-2">组件2: 获取用户信息</h2>
      <p className="mb-2">从Redux store中获取的用户信息：</p>
      
      {Object.keys(userInfo).length > 0 ? (
        <div className="bg-gray-100 p-3 rounded">
          <p><strong>用户名:</strong> {userInfo.userName}</p>
          <p><strong>昵称:</strong> {userInfo.nickName}</p>
          <p><strong>手机:</strong> {userInfo.phone}</p>
          <p><strong>邮箱:</strong> {userInfo.email}</p>
        </div>
      ) : (
        <p className="text-gray-500">暂无用户信息，请先在上方组件保存</p>
      )}
    </div>
  );
};

// 主示例组件
const UserInfoExample = () => {
  return (
    <div className="max-w-md mx-auto my-8">
      <h1 className="text-2xl font-bold mb-6">用户信息共享示例</h1>
      <p className="mb-4">这个示例展示了如何在不同组件间共享用户信息：</p>
      <ol className="list-decimal pl-5 mb-6">
        <li>在组件1中，直接保存用户信息到Redux store</li>
        <li>在组件2中，从Redux store获取并显示用户信息</li>
      </ol>
      
      <SaveUserInfoComponent />
      <GetUserInfoComponent />
    </div>
  );
};

export default UserInfoExample;