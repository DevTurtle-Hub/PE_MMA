import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBooks } from '../contexts/BooksContext';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { GENRES, STATUSES, COLORS } from '../constants';
import { validateBookData, BookValidationErrors } from '../utils/validators';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
  const { bookId } = route.params;
  const { books, updateBook, deleteBook, toggleFavorite } = useBooks();

  // Find book from context (real-time synced)
  const book = books.find((b) => b.id === bookId);

  // Edit Mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editGenre, setEditGenre] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editRating, setEditRating] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const [errors, setErrors] = useState<BookValidationErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState('');

  // Sync initial state when entering edit mode or when book updates
  useEffect(() => {
    if (book) {
      setEditTitle(book.title || '');
      setEditAuthor(book.author || '');
      setEditGenre(book.genre || '');
      setEditStatus(book.status || '');
      setEditRating(book.rating !== null && book.rating !== undefined ? String(book.rating) : '');
      setEditNotes(book.notes || '');
    }
  }, [book, isEditing]);

  if (!book) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={COLORS.textMuted} />
          <Text style={styles.notFoundText}>Book not found or deleted.</Text>
          <TouchableOpacity
            style={styles.backToListBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backToListText}>Back to List</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleFieldChange = (field: keyof BookValidationErrors, value: string) => {
    let newT = editTitle;
    let newA = editAuthor;
    let newG = editGenre;
    let newS = editStatus;
    let newR = editRating;
    let newN = editNotes;

    if (field === 'title') {
      newT = value;
      setEditTitle(value);
    } else if (field === 'author') {
      newA = value;
      setEditAuthor(value);
    } else if (field === 'genre') {
      newG = value;
      setEditGenre(value);
    } else if (field === 'status') {
      newS = value;
      setEditStatus(value);
    } else if (field === 'rating') {
      newR = value;
      setEditRating(value);
    } else if (field === 'notes') {
      newN = value;
      setEditNotes(value);
    }

    if (hasSubmitted) {
      const errs = validateBookData(newT, newA, newG, newS, newR, newN);
      setErrors((prev) => ({
        ...prev,
        [field]: errs[field] || null,
      }));
    }
  };

  const handleSave = async () => {
    setHasSubmitted(true);
    setEditError('');

    const validationErrors = validateBookData(
      editTitle,
      editAuthor,
      editGenre,
      editStatus,
      editRating,
      editNotes
    );
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsSaving(true);
      await updateBook(book.id, {
        title: editTitle,
        author: editAuthor,
        genre: editGenre,
        status: editStatus,
        rating: editRating,
        notes: editNotes,
      });

      setIsEditing(false);
      setHasSubmitted(false);
      setErrors({});
    } catch (err: any) {
      setEditError(err.message || 'Failed to update book');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setHasSubmitted(false);
    setErrors({});
    setEditError('');
    if (book) {
      setEditTitle(book.title || '');
      setEditAuthor(book.author || '');
      setEditGenre(book.genre || '');
      setEditStatus(book.status || '');
      setEditRating(book.rating !== null && book.rating !== undefined ? String(book.rating) : '');
      setEditNotes(book.notes || '');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete "${book.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteBook(book.id);
              navigation.goBack();
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Failed to delete book');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Book' : 'Book Details'}
        </Text>
        <TouchableOpacity
          onPress={() => toggleFavorite(book.id, book.favorite)}
          style={styles.favBtn}
        >
          <Ionicons
            name={book.favorite ? 'star' : 'star-outline'}
            size={26}
            color={book.favorite ? COLORS.favoriteActive : COLORS.favoriteInactive}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {editError !== '' && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={18} color={COLORS.danger} />
            <Text style={styles.errorBoxText}>{editError}</Text>
          </View>
        )}

        {isEditing ? (
          /* EDIT MODE */
          <View style={styles.formCard}>
            {/* Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title *</Text>
              <TextInput
                style={[styles.input, errors.title ? styles.inputError : null]}
                value={editTitle}
                onChangeText={(val) => handleFieldChange('title', val)}
                placeholder="Title"
                placeholderTextColor={COLORS.textMuted}
              />
              {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
            </View>

            {/* Author */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Author *</Text>
              <TextInput
                style={[styles.input, errors.author ? styles.inputError : null]}
                value={editAuthor}
                onChangeText={(val) => handleFieldChange('author', val)}
                placeholder="Author"
                placeholderTextColor={COLORS.textMuted}
              />
              {errors.author ? <Text style={styles.errorText}>{errors.author}</Text> : null}
            </View>

            {/* Genre */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Genre *</Text>
              <View style={[styles.pickerContainer, errors.genre ? styles.inputError : null]}>
                <Picker
                  selectedValue={editGenre}
                  onValueChange={(val) => handleFieldChange('genre', val)}
                  style={styles.picker}
                >
                  <Picker.Item label="Choose genre" value="" color={COLORS.textMuted} />
                  {GENRES.map((g) => (
                    <Picker.Item key={g} label={g} value={g} color={COLORS.text} />
                  ))}
                </Picker>
              </View>
              {errors.genre ? <Text style={styles.errorText}>{errors.genre}</Text> : null}
            </View>

            {/* Status */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Status *</Text>
              <View style={[styles.pickerContainer, errors.status ? styles.inputError : null]}>
                <Picker
                  selectedValue={editStatus}
                  onValueChange={(val) => handleFieldChange('status', val)}
                  style={styles.picker}
                >
                  <Picker.Item label="Choose status" value="" color={COLORS.textMuted} />
                  {STATUSES.map((s) => (
                    <Picker.Item key={s} label={s} value={s} color={COLORS.text} />
                  ))}
                </Picker>
              </View>
              {errors.status ? <Text style={styles.errorText}>{errors.status}</Text> : null}
            </View>

            {/* Rating */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Rating (0 - 5, optional)</Text>
              <TextInput
                style={[styles.input, errors.rating ? styles.inputError : null]}
                value={editRating}
                onChangeText={(val) => handleFieldChange('rating', val)}
                keyboardType="numeric"
                placeholder="0 - 5"
                placeholderTextColor={COLORS.textMuted}
              />
              {errors.rating ? <Text style={styles.errorText}>{errors.rating}</Text> : null}
            </View>

            {/* Notes */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Notes (optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea, errors.notes ? styles.inputError : null]}
                value={editNotes}
                onChangeText={(val) => handleFieldChange('notes', val)}
                multiline
                numberOfLines={3}
                placeholder="Notes (max 300 chars)"
                placeholderTextColor={COLORS.textMuted}
              />
              {errors.notes ? <Text style={styles.errorText}>{errors.notes}</Text> : null}
            </View>

            {/* Save / Cancel Buttons */}
            <View style={styles.editActionsRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={handleCancel}
                disabled={isSaving}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveBtn, isSaving ? styles.btnDisabled : null]}
                onPress={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.saveBtnText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* VIEW MODE */
          <View style={styles.detailsCard}>
            <View style={styles.titleSection}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>by {book.author}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Genre</Text>
                <View style={styles.genreBadge}>
                  <Text style={styles.genreBadgeText}>{book.genre}</Text>
                </View>
              </View>

              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Status</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>{book.status}</Text>
                </View>
              </View>

              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Rating</Text>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={14} color={COLORS.warning} />
                  <Text style={styles.ratingBadgeText}>
                    {book.rating !== null && book.rating !== undefined
                      ? `${book.rating} / 5`
                      : 'None'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.notesSection}>
              <Text style={styles.notesHeading}>Notes</Text>
              <Text style={styles.notesBody}>
                {book.notes && book.notes.trim() !== ''
                  ? book.notes
                  : 'No notes added for this book.'}
              </Text>
            </View>

            <View style={styles.divider} />

            {/* Action Buttons: Edit and Delete */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => setIsEditing(true)}
              >
                <Ionicons name="create-outline" size={18} color="#ffffff" />
                <Text style={styles.editBtnText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={handleDelete}
              >
                <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                <Text style={styles.deleteBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
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
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  favBtn: {
    padding: 6,
  },
  scrollContent: {
    padding: 16,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  notFoundText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  backToListBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  backToListText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 16,
  },
  titleSection: {
    gap: 6,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  bookAuthor: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    alignItems: 'center',
    gap: 6,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  genreBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  genreBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0369a1',
  },
  statusBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b45309',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.warningBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.warning,
  },
  notesSection: {
    gap: 8,
  },
  notesHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  notesBody: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
  },
  editBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  deleteBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#fee2e2',
    paddingVertical: 12,
    borderRadius: 10,
  },
  deleteBtnText: {
    color: COLORS.danger,
    fontSize: 15,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.dangerBg,
    borderWidth: 1,
    borderColor: COLORS.dangerBorder,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  errorBoxText: {
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  inputGroup: {
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: COLORS.background,
    color: COLORS.text,
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
  },
  editActionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  btnDisabled: {
    opacity: 0.7,
  },
});
