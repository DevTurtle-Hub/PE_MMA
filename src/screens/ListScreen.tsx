import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BooksContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Book } from '../types';
import { COLORS } from '../constants';
import { useBookFilters } from '../hooks/useBookFilters';

import { BookItem } from '../components/books/BookItem';
import { BookForm } from '../components/books/BookForm';
import { BookFilter } from '../components/books/BookFilter';
import { BookSummary } from '../components/books/BookSummary';
import { BookEmpty } from '../components/books/BookEmpty';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export default function ListScreen({ navigation }: Props) {
  const { currentUser, logout } = useAuth();
  const { books, loading, addBook, toggleFavorite } = useBooks();

  // Initially closed, opens when user clicks "+ Add New Book" button
  const [showAddForm, setShowAddForm] = useState(false);

  // Custom hook for search, filters, and summary
  const {
    searchQuery,
    setSearchQuery,
    filterGenre,
    setFilterGenre,
    filterStatus,
    setFilterStatus,
    favoritesOnly,
    setFavoritesOnly,
    filteredBooks,
    summary,
    clearFilters,
  } = useBookFilters(books);

  const handlePressBook = useCallback(
    (bookId: string) => {
      navigation.navigate('Detail', { bookId });
    },
    [navigation]
  );

  const handleToggleFavorite = useCallback(
    (bookId: string, currentFav: boolean) => {
      toggleFavorite(bookId, currentFav);
    },
    [toggleFavorite]
  );

  const renderBookItem: ListRenderItem<Book> = useCallback(
    ({ item }) => (
      <BookItem
        book={item}
        onPress={handlePressBook}
        onToggleFavorite={handleToggleFavorite}
      />
    ),
    [handlePressBook, handleToggleFavorite]
  );

  const ListHeader = (
    <View>
      {/* Prominent "Add New Book" Trigger Button */}
      <View style={styles.addBookSection}>
        <TouchableOpacity
          style={[styles.addBookTriggerBtn, showAddForm && styles.addBookTriggerBtnActive]}
          onPress={() => setShowAddForm((prev) => !prev)}
          activeOpacity={0.85}
        >
          <Ionicons
            name={showAddForm ? 'close-circle' : 'add-circle'}
            size={22}
            color="#ffffff"
          />
          <Text style={styles.addBookTriggerBtnText}>
            {showAddForm ? 'Close Add Form' : 'Add New Book'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Book Form (revealed upon clicking Add New Book) */}
      {showAddForm && (
        <View style={styles.formContainer}>
          <BookForm onAddBook={addBook} onClose={() => setShowAddForm(false)} />
        </View>
      )}

      {/* Search, Filter & Summary */}
      <BookFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterGenre={filterGenre}
        onGenreChange={setFilterGenre}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
        favoritesOnly={favoritesOnly}
        onFavoritesOnlyChange={setFavoritesOnly}
        onClear={clearFilters}
      />

      <BookSummary
        totalCount={summary.totalCount}
        favoriteCount={summary.favoriteCount}
        breakdown={summary.breakdown}
      />

      <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Books List</Text>
    </View>
  );

  return (
    <SafeAreaView testID="list-screen" style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerUserInfo}>
          <Ionicons name="person-circle" size={28} color={COLORS.primary} />
          <Text style={styles.headerEmail} numberOfLines={1}>
            {currentUser?.email || 'User'}
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color="#ef4444" />
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredBooks}
          extraData={filteredBooks}
          keyExtractor={(item) => item.id}
          renderItem={renderBookItem}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={BookEmpty}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  headerEmail: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#fee2e2',
  },
  logoutBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ef4444',
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  addBookSection: {
    marginBottom: 8,
  },
  addBookTriggerBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addBookTriggerBtnActive: {
    backgroundColor: '#475569',
  },
  addBookTriggerBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  formContainer: {
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
});
