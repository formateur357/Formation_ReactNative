import { act, renderHook } from '@testing-library/react-native';
import { useDebounce } from '../hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('retarde la mise à jour de la valeur', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'chi' } }
    );

    expect(result.current).toBe('chi');

    rerender({ value: 'chicken' });

    expect(result.current).toBe('chi');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('chicken');
  });
});
