import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book } from '../../types';
import { COLORS } from '../../constants';

interface BookItemProps {
  book: Book;
  onPress: (bookId: string) => void;
  onToggleFavorite: (bookId: string, currentFavorite: boolean) => void;
}

const BookItemComponent: React.FC<BookItemProps> = ({
  book,
  onPress,
  onToggleFavorite,
}) => {
  return (
    <TouchableOpacity
      testID="book-item"
      style={styles.bookItem}
      onPress={() => onPress(book.id)}
      activeOpacity={0.7}
    >
      <View style={styles.bookItemMain}>
        <Text style={styles.bookItemTitle}>{book.title}</Text>
        <Text style={styles.bookItemAuthor}>by {book.author}</Text>
        <View style={styles.badgesRow}>
          <View style={styles.genreBadge}>
            <Text style={styles.genreBadgeText}>{book.genre}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>{book.status}</Text>
          </View>
          {book.rating !== null && book.rating !== undefined && (
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color={COLORS.warning} />
              <Text style={styles.ratingBadgeText}>{book.rating}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Favorite Star Toggle */}
      <TouchableOpacity
        style={styles.starButton}
        onPress={() => onToggleFavorite(book.id, book.favorite)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons
          name={book.favorite ? 'star' : 'star-outline'}
          size={26}
          color={book.favorite ? COLORS.favoriteActive : COLORS.favoriteInactive}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// React.memo prevents re-rendering items unless their specific data or handlers change
export const BookItem = React.memo(BookItemComponent);

const styles = StyleSheet.create({
  bookItem: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  bookItemMain: {
    flex: 1,
    gap: 4,
  },
  bookItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  bookItemAuthor: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  genreBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  genreBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0369a1',
  },
  statusBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#b45309',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: COLORS.warningBg,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.warning,
  },
  starButton: {
    padding: 8,
    marginLeft: 8,
  },
});
