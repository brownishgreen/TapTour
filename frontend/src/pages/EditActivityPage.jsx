import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreateActivityForm from '../components/CreateActivityForm';
import '../scss/pages/_create-activity-page.scss';
import '../scss/components/_backgrounds.scss';

const EditActivityPage = () => {
  return (
    <div className="create-activity-form-page">
      <Header />
      <div className="create-activity-form-page__container create-activity-background">
        <h1>編輯活動</h1>
        <div className="create-activity-form-page__form">
          <CreateActivityForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditActivityPage;