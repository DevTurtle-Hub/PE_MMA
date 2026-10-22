import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { GENRES, STATUSES, COLORS } from '../../constants';

interface BookFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterGenre: string;
  onGenreChange: (genre: string) => void;
  filterStatus: string;
  onStatusChange: (status: string) => void;
  favoritesOnly: boolean;
  onFavoritesOnlyChange: (val: boolean) => void;
  onClear: () => void;
}

export const BookFilter: React.FC<BookFilterProps> = ({
  searchQuery,
  onSearchChange,
  filterGenre,
  onGenreChange,
  filterStatus,
  onStatusChange,
  favoritesOnly,
  onFavoritesOnlyChange,
  onClear,
}) => {
  return (
    <View style={styles.filterCard}>
      <Text style={styles.filterTitle}>Search & Filter</Text>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={COLORS.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title or author..."
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Genre Filter */}
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Genre:</Text>
        <View style={styles.filterPickerWrap}>
          <Picker
            selectedValue={filterGenre}
            onValueChange={(val) => onGenreChange(val)}
            style={styles.filterPicker}
            dropdownIconColor={COLORS.textSecondary}
          >
            <Picker.Item label="All" value="All" color={COLORS.text} />
            {GENRES.map((g) => (
              <Picker.Item key={g} label={g} value={g} color={COLORS.text} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Status Filter */}
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Status:</Text>
        <View style={styles.filterPickerWrap}>
          <Picker
            selectedValue={filterStatus}
            onValueChange={(val) => onStatusChange(val)}
            style={styles.filterPicker}
            dropdownIconColor={COLORS.textSecondary}
          >
            <Picker.Item label="All" value="All" color={COLORS.text} />
            {STATUSES.map((s) => (
              <Picker.Item key={s} label={s} value={s} color={COLORS.text} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Favorites Only Switch */}
      <View style={styles.switchRow}>
        <Text style={styles.filterLabel}>Favorites only:</Text>
        <Switch
          value={favoritesOnly}
          onValueChange={onFavoritesOnlyChange}
          trackColor={{ false: COLORS.borderInput, true: '#93c5fd' }}
          thumbColor={favoritesOnly ? COLORS.primary : COLORS.background}
        />
      </View>

      {/* Clear Button */}
      <TouchableOpacity style={styles.clearBtn} onPress={onClear}>
        <Ionicons name="refresh-outline" size={16} color="#475569" />
        <Text style={styles.clearBtnText}>Clear Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
    marginTop: 14,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: COLORS.background,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  filterPickerWrap: {
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    width: 180,
    overflow: 'hidden',
  },
  filterPicker: {
    height: 50,
    width: '100%',
    color: COLORS.text,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    backgroundColor: '#f1f5f9',
  },
  clearBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
});
