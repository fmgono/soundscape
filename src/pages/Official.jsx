import React from 'react';

import Section from '../components/Section/Section';
import Header from '../components/Header/Header';
import MainSoundList from '../components/Section/Main/MainSounds/MainSoundList';
import MainTitle from '../components/Section/Main/MainTitle';
import UploadButton from '../components/Button/UploadButton';

const OfficialPage = () => {
  return (
    <Section>
      <Header firstNav={'Soundscape'} secondNav={'Official'} />
      <UploadButton />
      <MainTitle title={'Soundscape uploads'} />
      <MainSoundList />
    </Section>
  );
};

export default OfficialPage;
