import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Contact from '@/components/Contact';

export type ContactInfo = {
  name: string;
  email: string;
};

const SkeletonAnimation = () => {
  const [contacts, setContacts] = useState<ContactInfo[] | undefined>();
  const fetchContacts = useCallback(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setContacts(data);
  }, []);

  const contactPlaceholderList = useMemo(() => {
    return Array.from({ length: 15 }).map((_, index) => null);
  }, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{ height: 1, width: '100%', backgroundColor: '#CED0CE' }}
            />
          );
        }}
        data={contacts ?? contactPlaceholderList}
        renderItem={({ item, index }) => {
          return <Contact contact={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SkeletonAnimation;
