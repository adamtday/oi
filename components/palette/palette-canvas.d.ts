// Type declarations for palette-canvas.tsx

// Declare React hooks and types
declare namespace React {
  // Basic types
  type ReactNode = any;
  type Key = string | number;
  type ElementType = any;
  type RefObject<T> = { current: T | null };
  
  // Event types
  interface SyntheticEvent<T = Element, E = Event> {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: T;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: E;
    preventDefault(): void;
    stopPropagation(): void;
    target: EventTarget;
    timeStamp: number;
    type: string;
  }
  
  interface MouseEvent<T = Element> extends SyntheticEvent<T, NativeMouseEvent> {
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    screenX: number;
    screenY: number;
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
    getModifierState(key: string): boolean;
  }
  
  // Fixed ChangeEvent to not extend SyntheticEvent directly
  interface ChangeEvent<T = Element> {
    target: T & {
      value: string;
      checked?: boolean;
      name?: string;
    };
    currentTarget: T;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    preventDefault(): void;
    stopPropagation(): void;
    timeStamp: number;
    type: string;
    nativeEvent: Event;
  }
  
  interface KeyboardEvent<T = Element> extends SyntheticEvent<T, NativeKeyboardEvent> {
    altKey: boolean;
    charCode: number;
    ctrlKey: boolean;
    key: string;
    keyCode: number;
    locale: string;
    location: number;
    metaKey: boolean;
    repeat: boolean;
    shiftKey: boolean;
    which: number;
    getModifierState(key: string): boolean;
  }
  
  // Hooks
  function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  function useContext<T>(context: Context<T>): T;
  function useReducer<R extends Reducer<any, any>, I>(
    reducer: R,
    initialArg: I,
    init?: (arg: I) => ReducerState<R>
  ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
  function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  function useMemo<T>(factory: () => T, deps: any[]): T;
  function useRef<T>(initialValue: T | null): RefObject<T>;
  function useImperativeHandle<T, R extends T>(
    ref: Ref<T> | undefined,
    init: () => R,
    deps?: any[]
  ): void;
  function useLayoutEffect(effect: () => void | (() => void), deps?: any[]): void;
  function useDebugValue<T>(value: T, format?: (value: T) => any): void;
  
  // Types for context
  interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    displayName?: string;
  }
  type Provider<T> = any;
  type Consumer<T> = any;
  
  // Types for reducers
  type Reducer<S, A> = (prevState: S, action: A) => S;
  type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
  type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;
  type Dispatch<A> = (value: A) => void;
  type Ref<T> = RefObject<T> | ((instance: T | null) => void) | null;
}

// Native event interfaces
interface NativeMouseEvent extends MouseEvent {}
interface NativeKeyboardEvent extends KeyboardEvent {}
interface EventTarget {
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  dispatchEvent(event: Event): boolean;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

// Button component props
interface ButtonProps {
  variant?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  asChild?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

// Extend HTMLAttributes for components
interface HTMLAttributes {
  className?: string;
  style?: any;
  onClick?: (event: React.MouseEvent) => void;
  onMouseDown?: (event: React.MouseEvent) => void;
  onMouseMove?: (event: React.MouseEvent) => void;
  onMouseUp?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onChange?: (event: React.ChangeEvent) => void;
  [key: string]: any;
} 