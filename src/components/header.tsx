import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useNavigation } from '@react-navigation/native';

import { isAndroid } from '../utilities/constants';
import { AppColors } from '../utilities/colors';

interface Type {
    title: String;
    showBackButton?: boolean;
}

export const BackButtonHeader = ({ title, showBackButton = true }: Type) => {
    const naigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                {
                    paddingTop: insets.top,
                    backgroundColor: AppColors.primary
                },
                styles.hederBottomBorder
            ]}>
            {isAndroid && (
                <StatusBar
                    translucent
                    barStyle="dark-content"
                    backgroundColor="transparent"
                />
            )}
            <View style={styles.header}>
                {showBackButton ? (
                    <TouchableOpacity
                        style={{ padding: 5 }}
                        onPress={naigation.goBack}>
                        <Ionicons name="chevron-back-outline" size={24} color={AppColors.white} />
                    </TouchableOpacity>
                ) : (
                    <View />
                )}

                <View
                    style={styles.middleView}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 18,
                            color: 'white'
                        }}>
                        {title}
                    </Text>
                </View>

                <View>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingStart: 6,
        paddingEnd: 16
    },
    hederBottomBorder: {
        borderBottomColor: AppColors.grey,
        borderBottomWidth: 1
    },
    middleView: {
        position: 'absolute',
        top: 0,
        left: 80,
        right: 80,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
