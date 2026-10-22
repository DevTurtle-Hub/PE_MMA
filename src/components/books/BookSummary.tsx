import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import { StatusBreakdown } from '../../utils/sorters';

interface BookSummaryProps {
  totalCount: number;
  favoriteCount: number;
  breakdown: StatusBreakdown[];
}

export const BookSummary: React.FC<BookSummaryProps> = ({
  totalCount,
  favoriteCount,
  breakdown,
}) => {
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Current View Summary</Text>
      <View style={styles.summaryStatsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Books</Text>
          <Text testID="book-count" style={styles.statValue}>
            {totalCount}
          </Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Favorites</Text>
          <Text testID="favorite-count" style={styles.statValue}>
            {favoriteCount}
          </Text>
        </View>
      </View>

      {/* Status Breakdown */}
      {breakdown.length > 0 && (
        <View style={styles.breakdownBox}>
          <Text style={styles.breakdownHeading}>Status Breakdown:</Text>
          {breakdown.map((item) => (
            <View key={item.status} style={styles.breakdownRow}>
              <Text style={styles.breakdownStatusName}>{item.status}</Text>
              <Text style={styles.breakdownStatusCount}>{item.count}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
    marginTop: 14,
    marginBottom: 14,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  summaryStatsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  breakdownBox: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginTop: 4,
  },
  breakdownHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  breakdownStatusName: {
    fontSize: 13,
    color: '#334155',
  },
  breakdownStatusCount: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
