import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export async function programmerRappelCuisine(hour = 18, minute = 30) {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Permission notifications refusée');
  }

  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Heure de cuisiner !',
      body: 'Choisis une recette dans tes favoris et passe en cuisine 🍳'
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute
    }
  });
}

export async function annulerRappelCuisine(notificationId: string | null) {
  if (!notificationId) return;
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}
