import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { GENRES, STATUSES, COLORS, MESSAGES } from '../../constants';
import { validateBookData, BookValidationErrors } from '../../utils/validators';
import { NewBookInput } from '../../types';

interface BookFormProps {
  onAddBook: (book: NewBookInput) => Promise<string>;
  onClose?: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({ onAddBook, onClose }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('');
  const [rating, setRating] = useState('');
  const [notes, setNotes] = useState('');

  const [formErrors, setFormErrors] = useState<BookValidationErrors>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bookSuccess, setBookSuccess] = useState('');
  const [bookError, setBookError] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleFieldChange = (field: keyof BookValidationErrors, value: string) => {
    let newTitle = title;
    let newAuthor = author;
    let newGenre = genre;
    let newStatus = status;
    let newRating = rating;
    let newNotes = notes;

    if (field === 'title') {
      newTitle = value;
      setTitle(value);
    } else if (field === 'author') {
      newAuthor = value;
      setAuthor(value);
    } else if (field === 'genre') {
      newGenre = value;
      setGenre(value);
    } else if (field === 'status') {
      newStatus = value;
      setStatus(value);
    } else if (field === 'rating') {
      newRating = value;
      setRating(value);
    } else if (field === 'notes') {
      newNotes = value;
      setNotes(value);
    }

    if (formSubmitted) {
      const errs = validateBookData(
        newTitle,
        newAuthor,
        newGenre,
        newStatus,
        newRating,
        newNotes
      );
      setFormErrors((prev) => ({
        ...prev,
        [field]: errs[field] || null,
      }));
    }
  };

  const handleAddBook = async () => {
    setFormSubmitted(true);
    setBookSuccess('');
    setBookError('');

    const errs = validateBookData(title, author, genre, status, rating, notes);
    setFormErrors(errs);

    if (Object.keys(errs).length > 0) {
      return;
    }

    try {
      setIsAdding(true);
      await onAddBook({
        title,
        author,
        genre,
        status,
        rating,
        notes,
      });

      // Clear form on success
      setTitle('');
      setAuthor('');
      setGenre('');
      setStatus('');
      setRating('');
      setNotes('');
      setFormSubmitted(false);
      setFormErrors({});
      setBookSuccess(MESSAGES.BOOK_ADDED);
    } catch (err: any) {
      setBookError(err.message || 'Failed to add book');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <View testID="book-form" style={styles.formCard}>
      {/* Header with Title and Close Button */}
      <View style={styles.formHeaderRow}>
        <View style={styles.formTitleContainer}>
          <Ionicons name="book" size={18} color={COLORS.primary} />
          <Text style={styles.formTitle}>Add Book to Library</Text>
        </View>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close" size={22} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Book Success Message */}
      {bookSuccess !== '' && (
        <View style={styles.successBox}>
          <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
          <Text testID="book-success" style={styles.successBoxText}>
            {bookSuccess}
          </Text>
        </View>
      )}

      {/* Error Book Message */}
      {bookError !== '' && (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle" size={18} color={COLORS.danger} />
          <Text testID="error-book" style={styles.errorBoxText}>
            {bookError}
          </Text>
        </View>
      )}

      {/* Title */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={[styles.input, formErrors.title ? styles.inputError : null]}
          placeholder="Book title"
          placeholderTextColor={COLORS.textMuted}
          value={title}
          onChangeText={(val) => handleFieldChange('title', val)}
        />
        {formErrors.title ? (
          <Text style={styles.errorText}>{formErrors.title}</Text>
        ) : null}
      </View>

      {/* Author */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Author *</Text>
        <TextInput
          style={[styles.input, formErrors.author ? styles.inputError : null]}
          placeholder="Author name"
          placeholderTextColor={COLORS.textMuted}
          value={author}
          onChangeText={(val) => handleFieldChange('author', val)}
        />
        {formErrors.author ? (
          <Text style={styles.errorText}>{formErrors.author}</Text>
        ) : null}
      </View>

      {/* Genre Picker */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Genre *</Text>
        <View style={[styles.pickerContainer, formErrors.genre ? styles.inputError : null]}>
          <Picker
            selectedValue={genre}
            onValueChange={(val) => handleFieldChange('genre', val)}
            style={styles.picker}
          >
            <Picker.Item label="Choose genre" value="" color={COLORS.textMuted} />
            {GENRES.map((g) => (
              <Picker.Item key={g} label={g} value={g} color={COLORS.text} />
            ))}
          </Picker>
        </View>
        {formErrors.genre ? (
          <Text style={styles.errorText}>{formErrors.genre}</Text>
        ) : null}
      </View>

      {/* Status Picker */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Status *</Text>
        <View style={[styles.pickerContainer, formErrors.status ? styles.inputError : null]}>
          <Picker
            selectedValue={status}
            onValueChange={(val) => handleFieldChange('status', val)}
            style={styles.picker}
          >
            <Picker.Item label="Choose status" value="" color={COLORS.textMuted} />
            {STATUSES.map((s) => (
              <Picker.Item key={s} label={s} value={s} color={COLORS.text} />
            ))}
          </Picker>
        </View>
        {formErrors.status ? (
          <Text style={styles.errorText}>{formErrors.status}</Text>
        ) : null}
      </View>

      {/* Rating */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Rating (0 - 5, optional)</Text>
        <TextInput
          style={[styles.input, formErrors.rating ? styles.inputError : null]}
          placeholder="Rating (0 - 5)"
          placeholderTextColor={COLORS.textMuted}
          value={rating}
          onChangeText={(val) => handleFieldChange('rating', val)}
          keyboardType="numeric"
        />
        {formErrors.rating ? (
          <Text style={styles.errorText}>{formErrors.rating}</Text>
        ) : null}
      </View>

      {/* Notes */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea, formErrors.notes ? styles.inputError : null]}
          placeholder="Short notes (max 300 characters)"
          placeholderTextColor={COLORS.textMuted}
          value={notes}
          onChangeText={(val) => handleFieldChange('notes', val)}
          multiline
          numberOfLines={3}
        />
        {formErrors.notes ? (
          <Text style={styles.errorText}>{formErrors.notes}</Text>
        ) : null}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        {onClose && (
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.addBtn, isAdding ? styles.btnDisabled : null, onClose ? { flex: 1 } : null]}
          onPress={handleAddBook}
          disabled={isAdding}
        >
          {isAdding ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.addBtnText}>Add Book</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 12,
  },
  formHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  formTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  closeBtn: {
    padding: 4,
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.successBg,
    borderWidth: 1,
    borderColor: COLORS.successBorder,
    borderRadius: 8,
    padding: 10,
  },
  successBoxText: {
    color: COLORS.success,
    fontWeight: '600',
    fontSize: 14,
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
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    opacity: 0.7,
  },
  addBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
