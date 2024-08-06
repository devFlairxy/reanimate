import { View, Text } from 'react-native';
import React from 'react';
import DropdownListItem from './DropdownListItem';
import { useSharedValue } from 'react-native-reanimated';

export interface ItemType {
  label: string;
  iconName: string;
}

interface DropdownProps {
  options: ItemType[];
  header: ItemType;
}

const Dropdown = ({ header, options }: DropdownProps) => {
  const dropdownItems = [header, ...options];
  const isExpanded = useSharedValue(false)
  return (
    <>
      {dropdownItems.map((item, index) => {
        return <DropdownListItem {...item} index={index} key={index}
        totalItems={dropdownItems.length} isExpanded={isExpanded} />;
      })}
    </>
  );
};

export default Dropdown;
