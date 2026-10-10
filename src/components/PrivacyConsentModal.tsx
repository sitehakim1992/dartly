import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';

export const PRIVACY_URL = 'https://sitehakim1992.github.io/privacy-site/dartly-privacy/';
const APP_NAME = 'Dartly';
const DEVELOPER = 'Abdelhakim MAHFOUD (newHMapps)';

type Lang = 'en' | 'zh';

// Chinese by default if the device language is Chinese, otherwise English
const detectLang = (): Lang => {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale || '';
    return locale.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  } catch (e) {
    return 'en';
  }
};

const content = {
  en: {
    title: 'Privacy Policy',
    body:
      `Welcome to ${APP_NAME}!\n` +
      `Developer: ${DEVELOPER}\n\n` +
      'This free app shows ads provided by third-party partners, which may use your device ID and IP address. Your learning progress stays on your device only.\n\n' +
      'Please read our Privacy Policy and tap "Agree" to continue. If you tap "Disagree", the app will close.',
    link: 'Read the full Privacy Policy',
    agree: 'Agree',
    disagree: 'Disagree',
  },
  zh: {
    title: '隐私政策',
    body:
      `欢迎使用 ${APP_NAME}！\n` +
      `开发者：${DEVELOPER}\n\n` +
      '本应用免费，并展示由第三方合作伙伴提供的广告，其可能使用您的设备标识符和 IP 地址。您的学习进度仅保存在本地。\n\n' +
      '请阅读《隐私政策》并点击“同意”继续。如果您点击“不同意”，应用将退出。',
    link: '阅读完整隐私政策',
    agree: '同意',
    disagree: '不同意',
  },
};

type Props = {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
};

const PrivacyConsentModal = ({visible, onAccept, onDecline}: Props) => {
  const [lang, setLang] = useState<Lang>(detectLang);
  const t = content[lang];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.langRow}>
            {(['en', 'zh'] as Lang[]).map(l => (
              <TouchableOpacity
                key={l}
                onPress={() => setLang(l)}
                style={[styles.langBtn, lang === l && styles.langBtnActive]}>
                <Text
                  style={[styles.langText, lang === l && styles.langTextActive]}>
                  {l === 'en' ? 'English' : '中文'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.title}>{t.title}</Text>

          <ScrollView style={styles.scroll}>
            <Text style={styles.body}>{t.body}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`${PRIVACY_URL}?lang=${lang}`)}>
              <Text style={styles.link}>{t.link}</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.btn, styles.declineBtn]}
              onPress={onDecline}>
              <Text style={styles.declineText}>{t.disagree}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.acceptBtn]}
              onPress={onAccept}>
              <Text style={styles.acceptText}>{t.agree}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  langBtn: {
    borderWidth: 1,
    borderColor: '#667EEA',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginLeft: 8,
  },
  langBtnActive: {backgroundColor: '#667EEA'},
  langText: {color: '#667EEA', fontSize: 14},
  langTextActive: {color: '#FFF'},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E0E0FF',
    textAlign: 'center',
    marginBottom: 12,
  },
  scroll: {marginBottom: 16},
  body: {fontSize: 15, lineHeight: 23, color: '#C8C8E0'},
  link: {
    marginTop: 12,
    fontSize: 15,
    color: '#8FA2F5',
    textDecorationLine: 'underline',
  },
  buttons: {flexDirection: 'row', gap: 12},
  btn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  declineBtn: {borderWidth: 1, borderColor: '#3A3A5A', backgroundColor: 'transparent'},
  acceptBtn: {backgroundColor: '#667EEA'},
  declineText: {fontSize: 16, color: '#C8C8E0'},
  acceptText: {fontSize: 16, color: '#FFF', fontWeight: 'bold'},
});

export default PrivacyConsentModal;