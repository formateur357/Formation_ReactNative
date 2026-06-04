import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-mmkv', () => {
  class MMKVMock {
    private storage = new Map<string, string>();
    getString(key: string) {
      return this.storage.get(key);
    }
    set(key: string, value: string | number | boolean) {
      this.storage.set(key, String(value));
    }
    delete(key: string) {
      this.storage.delete(key);
    }
    clearAll() {
      this.storage.clear();
    }
  }

  return { MMKV: MMKVMock };
});

jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  requestPermissionsAsync: jest.fn(async () => ({ status: 'granted' })),
  scheduleNotificationAsync: jest.fn(async () => 'notification-id'),
  cancelScheduledNotificationAsync: jest.fn(async () => undefined),
  cancelAllScheduledNotificationsAsync: jest.fn(async () => undefined),
  SchedulableTriggerInputTypes: { DAILY: 'daily' }
}));
