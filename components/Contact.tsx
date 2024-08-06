import { View, Text } from 'react-native';
import React from 'react';
import { ContactInfo } from '@/app/skeletonAnimation';
import { Skeleton } from 'moti/skeleton';
import Animated, { FadeIn, Layout, LinearTransition } from 'react-native-reanimated';

type ContactProps = {
  contact?: ContactInfo | null;
};

const SkeletonCommonProps = {
  colorMode: 'light',
  backgroundColor: '#D4D4D4',
  transition: {
    type: 'timing',
    duration: 2000,
  },
} as const;

const Contact = ({ contact }: ContactProps) => {
  return (
    <View
      style={{
        width: '100%',
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Skeleton.Group show={contact == null}>
        <Skeleton
          width={70}
          height={70}
          radius={'round'}
          {...SkeletonCommonProps}
        >
          <Animated.View
            layout={LinearTransition.duration(1500)}
            entering={FadeIn.duration(1500)}
            style={{
              height: 70,
              aspectRatio: 1,
              backgroundColor: '#005CB7',
              borderRadius: 35,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {contact && (
              <Text style={{ fontSize: 25, color: '#fff' }}>
                {' '}
                {contact.name[0]}{' '}
              </Text>
            )}
          </Animated.View>
        </Skeleton>
        <Animated.View  layout={LinearTransition.duration(1500)}
            entering={FadeIn.duration(1500)}>
          <Skeleton width={'80%'} height={30} {...SkeletonCommonProps}>
            {contact && <Text style={{ fontSize: 25 }}> {contact.name} </Text>}
          </Skeleton>
          <View style={{ height: 5 }} />
          <Skeleton width={'70%'} height={30} {...SkeletonCommonProps}>
            {contact && <Text style={{ fontSize: 25 }}> {contact.email} </Text>}
          </Skeleton>
        </Animated.View>
      </Skeleton.Group>
    </View>
  );
};

export default Contact;
