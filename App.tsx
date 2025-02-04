import React from 'react';
import { Text } from 'react-native';
import { EnhancedSectionList } from './app/components/AnimatedSectionList';
import sections from './app/constant/section';

const App = () => {

  const renderItem = (item: string) => (
    <Text>{item}</Text>
  );

  // Optional custom header
  const renderStickyHeader = (title: string) => {
    if (title) return (
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        Current: {title}
      </Text>
    )
  };

  return (
    <EnhancedSectionList
      sections={sections}
      renderItem={renderItem}
      renderStickyHeader={renderStickyHeader}
      dimensions={{
        headerHeight: 50,
        itemHeight: 60,
      }}
      headerAnimationConfig={{
        duration: 200,
        opacity: true,
        translate: true,
      }}
      onSectionChange={(title) => console.log(`Changed to section: ${title}`)}
    />
  );
};

export default App;