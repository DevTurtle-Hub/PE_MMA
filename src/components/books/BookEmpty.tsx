import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, MESSAGES } from '../../constants';

export const BookEmpty: React.FC = () => {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="book-outline" size={48} color={COLORS.textMuted} />
      <Text testID="books-empty" style={styles.emptyText}>
        {MESSAGES.NO_BOOKS_FOUND}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: COLORS.surface,
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 10,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
});
