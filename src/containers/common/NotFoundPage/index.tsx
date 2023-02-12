import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@modules/Button';
import './style.scss';

const Index = () => {
    const navigate = useNavigate();
    const lastPage = -1;

    const handleClickBackPage = () => navigate(lastPage);

    return (
        <div className="notFoundPage__wrapper">
            <h2>頁面不存在</h2>
            <h3>404 Page Not Found</h3>
            <p>請重新確認路徑， 或點擊按鈕返回上一頁</p>
            <Button color="primary" className="button__back" onClick={handleClickBackPage}>
                返回
            </Button>
        </div>
    );
};

export default Index;
