import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS } from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <View style={styles.logoBadge}>
            <Ionicons name="book" size={20} color="#ffffff" />
          </View>
          <Text style={styles.headerTitle}>BookShelf</Text>
        </View>
        <View style={styles.authButtons}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.8}
          >
            <Text style={styles.registerBtnText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.illustrationWrapper}>
            <Image
              source={require('../../assets/reading_scene_rich.png')}
              style={styles.heroIllustration}
              resizeMode="contain"
            />
          </View>

          <Text testID="home-title" style={styles.mainTitle}>
            BookShelf
          </Text>
          <Text style={styles.subtitle}>Your Personal Reading Library</Text>
          <Text style={styles.description}>
            Organize your reading journey effortlessly. Keep track of every book you own, sort by reading status and genre, and spotlight your favorite titles all in one place.
          </Text>
        </View>

        {/* Feature Cards Section (At least 3 feature cards as required by exam) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Key Features</Text>
          <Text style={styles.sectionSubheading}>Everything you need to manage your personal library</Text>
        </View>

        <View style={styles.cardsSection}>
          {/* Card 1 */}
          <View style={styles.card}>
            <View style={[styles.iconWrapper, { backgroundColor: '#dbeafe' }]}>
              <Ionicons name="library" size={26} color={COLORS.primary} />
            </View>
            <View style={styles.cardTextContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>Track your books</Text>
                <View style={[styles.cardTag, { backgroundColor: '#eff6ff' }]}>
                  <Text style={[styles.cardTagText, { color: COLORS.primary }]}>Catalog</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>
                Keep a safe, private collection of books you own, borrow, or plan to read with full details and personal notes.
              </Text>
            </View>
          </View>

          {/* Card 2 */}
          <View style={styles.card}>
            <View style={[styles.iconWrapper, { backgroundColor: '#fef3c7' }]}>
              <Ionicons name="filter" size={26} color="#d97706" />
            </View>
            <View style={styles.cardTextContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>Sort by status</Text>
                <View style={[styles.cardTag, { backgroundColor: '#fefce8' }]}>
                  <Text style={[styles.cardTagText, { color: '#b45309' }]}>Progress</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>
                Easily filter and categorize titles into To Read, Reading, or Finished with instant real-time breakdown statistics.
              </Text>
            </View>
          </View>

          {/* Card 3 */}
          <View style={styles.card}>
            <View style={[styles.iconWrapper, { backgroundColor: '#fce7f3' }]}>
              <Ionicons name="star" size={26} color="#db2777" />
            </View>
            <View style={styles.cardTextContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>Rate your favorites</Text>
                <View style={[styles.cardTag, { backgroundColor: '#fdf2f8' }]}>
                  <Text style={[styles.cardTagText, { color: '#be185d' }]}>Favorites</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>
                Mark your top books with stars, give ratings from 0 to 5, and filter down to favorites with a single tap.
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Call to Action */}
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Ready to build your BookShelf?</Text>
          <Text style={styles.ctaSubtitle}>Sign up in seconds to start tracking your reading world.</Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaButtonText}>Get Started Now</Text>
            <Ionicons name="arrow-forward" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  loginBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surface,
  },
  loginBtnText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  registerBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  registerBtnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: 12,
  },
  illustrationWrapper: {
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  heroIllustration: {
    width: '100%',
    height: '100%',
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  sectionSubheading: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  cardsSection: {
    gap: 12,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextContent: {
    flex: 1,
    gap: 4,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  cardTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  cardTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  ctaCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 28,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    gap: 8,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e3a8a',
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 13,
    color: '#3b82f6',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
