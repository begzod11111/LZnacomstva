// CheckBoxGender.jsx
import React, { useState, useCallback } from "react";
import MaleIcon from '../../../img/male-icon.svg';
import FemaleIcon from '../../../img/female-icon.svg';
import styles from './CheckboxGender.module.css';

const GENDER_OPTIONS = {
  MALE: 1,
  FEMALE: 2,
};

/**
 * Компонент выбора пола с помощью радио-кнопок
 * @param {Function} callbackFunc - Функция обратного вызова, возвращает выбранный пол
 * @param {Object} defaultValue - Начальное значение пола {name: 'male' | 'female'}
 * @param {boolean} disabled - Отключает возможность выбора
 */
const CheckBoxGender = ({ callbackFunc, defaultValue, disabled = false, ...props }) => {
  const getInitialState = useCallback((value) => {
    if (!value) return GENDER_OPTIONS.MALE;
    return value.name === 'male' ? GENDER_OPTIONS.MALE : GENDER_OPTIONS.FEMALE;
  }, []);

  const [gender, setGender] = useState(getInitialState(defaultValue));

  const handleGenderChange = useCallback((newGender) => {
    if (disabled) return;
    setGender(newGender);
    callbackFunc?.(newGender === GENDER_OPTIONS.MALE ? 'male' : 'female');
  }, [callbackFunc, disabled]);

  return (
    <div className={styles.gchkWrapper} role="radiogroup" aria-label="Выбор пола">
      <label
        className={`${styles.gchkItem} ${styles.gchkMale} ${gender === GENDER_OPTIONS.MALE ? styles.gchkActive : ''}`}
        data-testid="male-option"
      >
        <input
          type="radio"
          name="gender"
          value={GENDER_OPTIONS.MALE}
          checked={gender === GENDER_OPTIONS.MALE}
          onChange={() => handleGenderChange(GENDER_OPTIONS.MALE)}
          disabled={disabled}
          className={styles.gchkInput}
          aria-label="Мужской"
        />
        <div className={styles.gchkSymbol}>
          <img src={MaleIcon} alt="Мужской" />
        </div>
      </label>

      <label
        className={`${styles.gchkItem} ${styles.gchkFemale} ${gender === GENDER_OPTIONS.FEMALE ? styles.gchkActive : ''}`}
        data-testid="female-option"
      >
        <input
          type="radio"
          name="gender"
          value={GENDER_OPTIONS.FEMALE}
          checked={gender === GENDER_OPTIONS.FEMALE}
          onChange={() => handleGenderChange(GENDER_OPTIONS.FEMALE)}
          disabled={disabled}
          className={styles.gchkInput}
          aria-label="Женский"
        />
        <div className={styles.gchkSymbol}>
          <img src={FemaleIcon} alt="Женский" />
        </div>
      </label>
    </div>
  );
};

export default CheckBoxGender;