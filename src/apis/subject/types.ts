/* eslint-disable */
// @ts-ignore

export type Accessible = {
  accessibleContext?: AccessibleContext;
};

export type AccessibleAction = {
  accessibleActionCount?: number;
};

export type AccessibleComponent = {
  background?: Color;
  bounds?: Rectangle;
  cursor?: Cursor;
  enabled?: boolean;
  focusTraversable?: boolean;
  font?: Font;
  foreground?: Color;
  location?: Point;
  locationOnScreen?: Point;
  showing?: boolean;
  size?: Dimension;
  visible?: boolean;
};

export type AccessibleContext = {
  accessibleAction?: AccessibleAction;
  accessibleChildrenCount?: number;
  accessibleComponent?: AccessibleComponent;
  accessibleDescription?: string;
  accessibleEditableText?: AccessibleEditableText;
  accessibleIcon?: AccessibleIcon[];
  accessibleIndexInParent?: number;
  accessibleName?: string;
  accessibleParent?: Accessible;
  accessibleRelationSet?: AccessibleRelationSet;
  accessibleRole?: AccessibleRole;
  accessibleSelection?: AccessibleSelection;
  accessibleStateSet?: AccessibleStateSet;
  accessibleTable?: AccessibleTable;
  accessibleText?: AccessibleText;
  accessibleValue?: AccessibleValue;
  locale?: Locale;
};

export type AccessibleEditableText = {
  caretPosition?: number;
  charCount?: number;
  selectedText?: string;
  selectionEnd?: number;
  selectionStart?: number;
};

export type AccessibleIcon = {
  accessibleIconDescription?: string;
  accessibleIconHeight?: number;
  accessibleIconWidth?: number;
};

export type AccessibleRelationSet = object;

export type AccessibleRole = object;

export type AccessibleSelection = {
  accessibleSelectionCount?: number;
};

export type AccessibleStateSet = object;

export type AccessibleTable = {
  accessibleCaption?: Accessible;
  accessibleColumnCount?: number;
  accessibleColumnHeader?: AccessibleTable;
  accessibleRowCount?: number;
  accessibleRowHeader?: AccessibleTable;
  accessibleSummary?: Accessible;
  selectedAccessibleColumns?: number[];
  selectedAccessibleRows?: number[];
};

export type AccessibleText = {
  caretPosition?: number;
  charCount?: number;
  selectedText?: string;
  selectionEnd?: number;
  selectionStart?: number;
};

export type AccessibleValue = {
  currentAccessibleValue?: Number;
  maximumAccessibleValue?: Number;
  minimumAccessibleValue?: Number;
};

export type AffineTransform = {
  determinant?: number;
  identity?: boolean;
  scaleX?: number;
  scaleY?: number;
  shearX?: number;
  shearY?: number;
  translateX?: number;
  translateY?: number;
  type?: number;
};

export type Attribute = object;

export type AWTEvent = {
  id?: number;
  source?: Record<string, unknown>;
};

export type AWTEventListener = object;

export enum BaselineResizeBehaviorEnum {
  CONSTANT_ASCENT = 'CONSTANT_ASCENT',
  CONSTANT_DESCENT = 'CONSTANT_DESCENT',
  CENTER_OFFSET = 'CENTER_OFFSET',
  OTHER = 'OTHER',
}

export type IBaselineResizeBehaviorEnum =
  keyof typeof BaselineResizeBehaviorEnum;

export enum BaselineResizeBehaviorEnum2 {
  CONSTANT_ASCENT = 'CONSTANT_ASCENT',
  CONSTANT_DESCENT = 'CONSTANT_DESCENT',
  CENTER_OFFSET = 'CENTER_OFFSET',
  OTHER = 'OTHER',
}

export type IBaselineResizeBehaviorEnum2 =
  keyof typeof BaselineResizeBehaviorEnum2;

export enum BaselineResizeBehaviorEnum3 {
  CONSTANT_ASCENT = 'CONSTANT_ASCENT',
  CONSTANT_DESCENT = 'CONSTANT_DESCENT',
  CENTER_OFFSET = 'CENTER_OFFSET',
  OTHER = 'OTHER',
}

export type IBaselineResizeBehaviorEnum3 =
  keyof typeof BaselineResizeBehaviorEnum3;

export enum BaselineResizeBehaviorEnum4 {
  CONSTANT_ASCENT = 'CONSTANT_ASCENT',
  CONSTANT_DESCENT = 'CONSTANT_DESCENT',
  CENTER_OFFSET = 'CENTER_OFFSET',
  OTHER = 'OTHER',
}

export type IBaselineResizeBehaviorEnum4 =
  keyof typeof BaselineResizeBehaviorEnum4;

export type BufferCapabilities = {
  backBufferCapabilities?: ImageCapabilities;
  flipContents?: FlipContents;
  frontBufferCapabilities?: ImageCapabilities;
  fullScreenRequired?: boolean;
  multiBufferAvailable?: boolean;
  pageFlipping?: boolean;
};

export type BufferStrategy = {
  capabilities?: BufferCapabilities;
  drawGraphics?: Graphics;
};

export type Character = object;

export type Clipboard = {
  availableDataFlavors?: DataFlavor[];
  flavorListeners?: FlavorListener[];
  name?: string;
};

export type Color = {
  alpha?: number;
  blue?: number;
  colorSpace?: ColorSpace;
  green?: number;
  red?: number;
  rgb?: number;
  transparency?: number;
};

export type ColorModel = {
  alphaPremultiplied?: boolean;
  colorSpace?: ColorSpace;
  componentSize?: number[];
  numColorComponents?: number;
  numComponents?: number;
  pixelSize?: number;
  transferType?: number;
  transparency?: number;
};

export type ColorSpace = {
  cs_sRGB?: boolean;
  numComponents?: number;
  type?: number;
};

export type Component = {
  accessibleContext?: AccessibleContext;
  alignmentX?: number;
  alignmentY?: number;
  backgroundSet?: boolean;
  baselineResizeBehavior?:
    | 'CONSTANT_ASCENT'
    | 'CONSTANT_DESCENT'
    | 'CENTER_OFFSET'
    | 'OTHER';
  bounds?: Rectangle;
  colorModel?: ColorModel;
  componentListeners?: ComponentListener[];
  componentOrientation?: ComponentOrientation;
  cursor?: Cursor;
  cursorSet?: boolean;
  displayable?: boolean;
  doubleBuffered?: boolean;
  dropTarget?: DropTarget;
  enabled?: boolean;
  focusCycleRootAncestor?: Container;
  focusListeners?: FocusListener[];
  focusOwner?: boolean;
  focusTraversable?: boolean;
  focusTraversalKeysEnabled?: boolean;
  focusable?: boolean;
  fontSet?: boolean;
  foregroundSet?: boolean;
  graphics?: Graphics;
  graphicsConfiguration?: GraphicsConfiguration;
  height?: number;
  hierarchyBoundsListeners?: HierarchyBoundsListener[];
  hierarchyListeners?: HierarchyListener[];
  ignoreRepaint?: boolean;
  inputContext?: InputContext;
  inputMethodListeners?: InputMethodListener[];
  inputMethodRequests?: InputMethodRequests;
  keyListeners?: KeyListener[];
  lightweight?: boolean;
  locale?: Locale;
  location?: Point;
  locationOnScreen?: Point;
  maximumSize?: Dimension;
  maximumSizeSet?: boolean;
  minimumSize?: Dimension;
  minimumSizeSet?: boolean;
  mouseListeners?: MouseListener[];
  mouseMotionListeners?: MouseMotionListener[];
  mousePosition?: Point;
  mouseWheelListeners?: MouseWheelListener[];
  name?: string;
  opaque?: boolean;
  parent?: Container;
  peer?: ComponentPeer;
  preferredSize?: Dimension;
  preferredSizeSet?: boolean;
  propertyChangeListeners?: PropertyChangeListener[];
  showing?: boolean;
  size?: Dimension;
  toolkit?: Toolkit;
  treeLock?: Record<string, unknown>;
  valid?: boolean;
  width?: number;
  x?: number;
  y?: number;
};

export type ComponentListener = object;

export type ComponentOrientation = {
  horizontal?: boolean;
  leftToRight?: boolean;
};

export type ComponentPeer = {
  backBuffer?: Image;
  colorModel?: ColorModel;
  focusable?: boolean;
  graphics?: Graphics;
  graphicsConfiguration?: GraphicsConfiguration;
  locationOnScreen?: Point;
  minimumSize?: Dimension;
  obscured?: boolean;
  preferredSize?: Dimension;
  reparentSupported?: boolean;
};

export type Container = {
  accessibleContext?: AccessibleContext;
  alignmentX?: number;
  alignmentY?: number;
  backgroundSet?: boolean;
  baselineResizeBehavior?:
    | 'CONSTANT_ASCENT'
    | 'CONSTANT_DESCENT'
    | 'CENTER_OFFSET'
    | 'OTHER';
  bounds?: Rectangle;
  colorModel?: ColorModel;
  componentCount?: number;
  componentListeners?: ComponentListener[];
  componentOrientation?: ComponentOrientation;
  components?: Component[];
  containerListeners?: ContainerListener[];
  cursor?: Cursor;
  cursorSet?: boolean;
  displayable?: boolean;
  doubleBuffered?: boolean;
  dropTarget?: DropTarget;
  enabled?: boolean;
  focusCycleRoot?: boolean;
  focusCycleRootAncestor?: Container;
  focusListeners?: FocusListener[];
  focusOwner?: boolean;
  focusTraversable?: boolean;
  focusTraversalKeysEnabled?: boolean;
  focusTraversalPolicy?: FocusTraversalPolicy;
  focusTraversalPolicyProvider?: boolean;
  focusTraversalPolicySet?: boolean;
  focusable?: boolean;
  fontSet?: boolean;
  foregroundSet?: boolean;
  graphics?: Graphics;
  graphicsConfiguration?: GraphicsConfiguration;
  height?: number;
  hierarchyBoundsListeners?: HierarchyBoundsListener[];
  hierarchyListeners?: HierarchyListener[];
  ignoreRepaint?: boolean;
  inputContext?: InputContext;
  inputMethodListeners?: InputMethodListener[];
  inputMethodRequests?: InputMethodRequests;
  insets?: Insets;
  keyListeners?: KeyListener[];
  layout?: LayoutManager;
  lightweight?: boolean;
  locale?: Locale;
  location?: Point;
  locationOnScreen?: Point;
  maximumSize?: Dimension;
  maximumSizeSet?: boolean;
  minimumSize?: Dimension;
  minimumSizeSet?: boolean;
  mouseListeners?: MouseListener[];
  mouseMotionListeners?: MouseMotionListener[];
  mousePosition?: Point;
  mouseWheelListeners?: MouseWheelListener[];
  name?: string;
  opaque?: boolean;
  parent?: Container;
  peer?: ComponentPeer;
  preferredSize?: Dimension;
  preferredSizeSet?: boolean;
  propertyChangeListeners?: PropertyChangeListener[];
  showing?: boolean;
  size?: Dimension;
  toolkit?: Toolkit;
  treeLock?: Record<string, unknown>;
  valid?: boolean;
  validateRoot?: boolean;
  width?: number;
  x?: number;
  y?: number;
};

export type ContainerListener = object;

export type Cursor = {
  name?: string;
  type?: number;
};

export type DataFlavor = {
  defaultRepresentationClassAsString?: string;
  flavorJavaFileListType?: boolean;
  flavorRemoteObjectType?: boolean;
  flavorSerializedObjectType?: boolean;
  flavorTextType?: boolean;
  humanPresentableName?: string;
  mimeType?: string;
  mimeTypeSerializedObject?: boolean;
  primaryType?: string;
  representationClassByteBuffer?: boolean;
  representationClassCharBuffer?: boolean;
  representationClassInputStream?: boolean;
  representationClassReader?: boolean;
  representationClassRemote?: boolean;
  representationClassSerializable?: boolean;
  subType?: string;
};

export type Dimension = {
  height?: number;
  width?: number;
};

export type DisplayMode = {
  bitDepth?: number;
  height?: number;
  refreshRate?: number;
  width?: number;
};

export type DropTarget = {
  active?: boolean;
  component?: Component;
  defaultActions?: number;
  dropTargetContext?: DropTargetContext;
  flavorMap?: FlavorMap;
};

export type DropTargetContext = {
  component?: Component;
  dropTarget?: DropTarget;
};

export type EventQueue = {
  nextEvent?: AWTEvent;
};

export type FlavorListener = object;

export type FlavorMap = object;

export type FlipContents = object;

export type FocusListener = object;

export type FocusTraversalPolicy = object;

export type Font = {
  attributes?: Record<string, unknown>;
  availableAttributes?: Attribute[];
  bold?: boolean;
  family?: string;
  fontName?: string;
  italic?: boolean;
  italicAngle?: number;
  missingGlyphCode?: number;
  name?: string;
  numGlyphs?: number;
  peer?: FontPeer;
  plain?: boolean;
  psname?: string;
  size?: number;
  size2D?: number;
  style?: number;
  transform?: AffineTransform;
  transformed?: boolean;
};

export type FontMetrics = {
  ascent?: number;
  descent?: number;
  font?: Font;
  fontRenderContext?: FontRenderContext;
  height?: number;
  leading?: number;
  maxAdvance?: number;
  maxAscent?: number;
  maxDecent?: number;
  maxDescent?: number;
  widths?: number[];
};

export type FontPeer = object;

export type FontRenderContext = {
  antiAliased?: boolean;
  antiAliasingHint?: Record<string, unknown>;
  fractionalMetricsHint?: Record<string, unknown>;
  transform?: AffineTransform;
  transformType?: number;
  transformed?: boolean;
};

export type Graphics = {
  clip?: Shape;
  clipBounds?: Rectangle;
  clipRect?: Rectangle;
  color?: Color;
  font?: Font;
  fontMetrics?: FontMetrics;
};

export type GraphicsConfiguration = {
  bounds?: Rectangle;
  bufferCapabilities?: BufferCapabilities;
  colorModel?: ColorModel;
  defaultTransform?: AffineTransform;
  device?: GraphicsDevice;
  imageCapabilities?: ImageCapabilities;
  normalizingTransform?: AffineTransform;
  translucencyCapable?: boolean;
};

export type GraphicsDevice = {
  availableAcceleratedMemory?: number;
  configurations?: GraphicsConfiguration[];
  defaultConfiguration?: GraphicsConfiguration;
  displayChangeSupported?: boolean;
  displayMode?: DisplayMode;
  displayModes?: DisplayMode[];
  fullScreenSupported?: boolean;
  fullScreenWindow?: Window;
  idstring?: string;
  type?: number;
};

export type HierarchyBoundsListener = object;

export type HierarchyListener = object;

export type Image = {
  accelerationPriority?: number;
  graphics?: Graphics;
  source?: ImageProducer;
};

export type ImageCapabilities = {
  accelerated?: boolean;
  trueVolatile?: boolean;
};

export type ImageProducer = object;

export type InputContext = {
  inputMethodControlObject?: Record<string, unknown>;
  locale?: Locale;
};

export type InputMethodListener = object;

export type InputMethodRequests = {
  committedTextLength?: number;
  insertPositionOffset?: number;
};

export type Insets = {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
};

export type KeyListener = object;

export type Label = {
  accessibleContext?: AccessibleContext;
  alignment?: number;
  alignmentX?: number;
  alignmentY?: number;
  backgroundSet?: boolean;
  baselineResizeBehavior?:
    | 'CONSTANT_ASCENT'
    | 'CONSTANT_DESCENT'
    | 'CENTER_OFFSET'
    | 'OTHER';
  bounds?: Rectangle;
  colorModel?: ColorModel;
  componentListeners?: ComponentListener[];
  componentOrientation?: ComponentOrientation;
  cursor?: Cursor;
  cursorSet?: boolean;
  displayable?: boolean;
  doubleBuffered?: boolean;
  dropTarget?: DropTarget;
  enabled?: boolean;
  focusCycleRootAncestor?: Container;
  focusListeners?: FocusListener[];
  focusOwner?: boolean;
  focusTraversable?: boolean;
  focusTraversalKeysEnabled?: boolean;
  focusable?: boolean;
  fontSet?: boolean;
  foregroundSet?: boolean;
  graphics?: Graphics;
  graphicsConfiguration?: GraphicsConfiguration;
  height?: number;
  hierarchyBoundsListeners?: HierarchyBoundsListener[];
  hierarchyListeners?: HierarchyListener[];
  ignoreRepaint?: boolean;
  inputContext?: InputContext;
  inputMethodListeners?: InputMethodListener[];
  inputMethodRequests?: InputMethodRequests;
  keyListeners?: KeyListener[];
  lightweight?: boolean;
  locale?: Locale;
  location?: Point;
  locationOnScreen?: Point;
  maximumSize?: Dimension;
  maximumSizeSet?: boolean;
  minimumSize?: Dimension;
  minimumSizeSet?: boolean;
  mouseListeners?: MouseListener[];
  mouseMotionListeners?: MouseMotionListener[];
  mousePosition?: Point;
  mouseWheelListeners?: MouseWheelListener[];
  name?: string;
  opaque?: boolean;
  parent?: Container;
  peer?: ComponentPeer;
  preferredSize?: Dimension;
  preferredSizeSet?: boolean;
  propertyChangeListeners?: PropertyChangeListener[];
  showing?: boolean;
  size?: Dimension;
  text?: string;
  toolkit?: Toolkit;
  treeLock?: Record<string, unknown>;
  valid?: boolean;
  width?: number;
  x?: number;
  y?: number;
};

export type LayoutManager = object;

export type Locale = {
  country?: string;
  displayCountry?: string;
  displayLanguage?: string;
  displayName?: string;
  displayScript?: string;
  displayVariant?: string;
  extensionKeys?: Character[];
  iso3Country?: string;
  iso3Language?: string;
  language?: string;
  script?: string;
  unicodeLocaleAttributes?: string[];
  unicodeLocaleKeys?: string[];
  variant?: string;
};

export enum ModalExclusionTypeEnum {
  NO_EXCLUDE = 'NO_EXCLUDE',
  APPLICATION_EXCLUDE = 'APPLICATION_EXCLUDE',
  TOOLKIT_EXCLUDE = 'TOOLKIT_EXCLUDE',
}

export type IModalExclusionTypeEnum = keyof typeof ModalExclusionTypeEnum;

export type MouseListener = object;

export type MouseMotionListener = object;

export type MouseWheelListener = object;

export type Number = object;

export type PageResultSubjectInfoDTO_ = {
  end?: number;
  pageNo?: number;
  pageSize?: number;
  result?: SubjectInfoDTO[];
  start?: number;
  total?: number;
  totalPages?: number;
};

export type Point = {
  x?: number;
  y?: number;
};

export type PropertyChangeListener = object;

export type Rectangle = {
  bounds2D?: Rectangle2D;
  centerX?: number;
  centerY?: number;
  empty?: boolean;
  height?: number;
  location?: Point;
  maxX?: number;
  maxY?: number;
  minX?: number;
  minY?: number;
  size?: Dimension;
  width?: number;
  x?: number;
  y?: number;
};

export type Rectangle2D = {
  bounds?: Rectangle;
  bounds2D?: Rectangle2D;
  centerX?: number;
  centerY?: number;
  empty?: boolean;
  height?: number;
  maxX?: number;
  maxY?: number;
  minX?: number;
  minY?: number;
  width?: number;
  x?: number;
  y?: number;
};

export type Result = {
  code?: number;
  data?: Record<string, unknown>;
  message?: string;
  success?: boolean;
};

export type ResultBoolean_ = {
  code?: number;
  data?: boolean;
  message?: string;
  success?: boolean;
};

export type ResultListLabel_ = {
  code?: number;
  data?: Label[];
  message?: string;
  success?: boolean;
};

export type ResultListSubjectCategoryDTO_ = {
  code?: number;
  data?: SubjectCategoryDTO[];
  message?: string;
  success?: boolean;
};

export type ResultPageResultSubjectInfoDTO_ = {
  code?: number;
  data?: PageResultSubjectInfoDTO_;
  message?: string;
  success?: boolean;
};

export type ResultSubjectInfoDTO_ = {
  code?: number;
  data?: SubjectInfoDTO;
  message?: string;
  success?: boolean;
};

export type Shape = {
  bounds?: Rectangle;
  bounds2D?: Rectangle2D;
};

export type SubjectAnswerDTO = {
  isCorrect?: number;
  optionContent?: string;
  optionType?: number;
};

export type SubjectCategoryDTO = {
  categoryName?: string;
  categoryType?: number;
  count?: number;
  id?: number;
  imageUrl?: string;
  labelDTOList?: SubjectLabelDTO[];
  parentId?: number;
};

export type SubjectInfoDTO = {
  categoryId?: number;
  categoryIds?: number[];
  createUser?: string;
  createUserAvatar?: string;
  id?: number;
  keyWord?: string;
  labelId?: number;
  labelIds?: number[];
  labelName?: string[];
  lastSubjectId?: number;
  liked?: boolean;
  likedCount?: number;
  nextSubjectId?: number;
  optionList?: SubjectAnswerDTO[];
  pageNo?: number;
  pageSize?: number;
  settleName?: string;
  subjectAnswer?: string;
  subjectCount?: number;
  subjectDifficult?: number;
  subjectName?: string;
  subjectParse?: string;
  subjectScore?: number;
  subjectType?: number;
  suggestList?: SubjectSceneBO[];
};

export type SubjectLabelDTO = {
  categoryId?: number;
  id?: number;
  labelName?: string;
  sortNum?: number;
};

export type SubjectSceneBO = {
  suggestContent?: string;
  suggestRank?: number;
};

export type Toolkit = {
  alwaysOnTopSupported?: boolean;
  awteventListeners?: AWTEventListener[];
  colorModel?: ColorModel;
  dynamicLayoutActive?: boolean;
  fontList?: string[];
  maximumCursorColors?: number;
  menuShortcutKeyMask?: number;
  propertyChangeListeners?: PropertyChangeListener[];
  screenResolution?: number;
  screenSize?: Dimension;
  systemClipboard?: Clipboard;
  systemEventQueue?: EventQueue;
  systemSelection?: Clipboard;
};

export enum TypeEnum {
  NORMAL = 'NORMAL',
  UTILITY = 'UTILITY',
  POPUP = 'POPUP',
}

export type ITypeEnum = keyof typeof TypeEnum;

export type Window = {
  accessibleContext?: AccessibleContext;
  active?: boolean;
  alignmentX?: number;
  alignmentY?: number;
  alwaysOnTop?: boolean;
  alwaysOnTopSupported?: boolean;
  autoRequestFocus?: boolean;
  backgroundSet?: boolean;
  baselineResizeBehavior?:
    | 'CONSTANT_ASCENT'
    | 'CONSTANT_DESCENT'
    | 'CENTER_OFFSET'
    | 'OTHER';
  bounds?: Rectangle;
  bufferStrategy?: BufferStrategy;
  colorModel?: ColorModel;
  componentCount?: number;
  componentListeners?: ComponentListener[];
  componentOrientation?: ComponentOrientation;
  components?: Component[];
  containerListeners?: ContainerListener[];
  cursor?: Cursor;
  cursorSet?: boolean;
  displayable?: boolean;
  doubleBuffered?: boolean;
  dropTarget?: DropTarget;
  enabled?: boolean;
  focusCycleRoot?: boolean;
  focusCycleRootAncestor?: Container;
  focusListeners?: FocusListener[];
  focusOwner?: Component;
  focusTraversable?: boolean;
  focusTraversalKeysEnabled?: boolean;
  focusTraversalPolicy?: FocusTraversalPolicy;
  focusTraversalPolicyProvider?: boolean;
  focusTraversalPolicySet?: boolean;
  focusable?: boolean;
  focusableWindow?: boolean;
  focusableWindowState?: boolean;
  focused?: boolean;
  fontSet?: boolean;
  foregroundSet?: boolean;
  graphics?: Graphics;
  graphicsConfiguration?: GraphicsConfiguration;
  height?: number;
  hierarchyBoundsListeners?: HierarchyBoundsListener[];
  hierarchyListeners?: HierarchyListener[];
  iconImages?: Image[];
  ignoreRepaint?: boolean;
  inputContext?: InputContext;
  inputMethodListeners?: InputMethodListener[];
  inputMethodRequests?: InputMethodRequests;
  insets?: Insets;
  keyListeners?: KeyListener[];
  layout?: LayoutManager;
  lightweight?: boolean;
  locale?: Locale;
  location?: Point;
  locationByPlatform?: boolean;
  locationOnScreen?: Point;
  maximumSize?: Dimension;
  maximumSizeSet?: boolean;
  minimumSize?: Dimension;
  minimumSizeSet?: boolean;
  modalExclusionType?: 'NO_EXCLUDE' | 'APPLICATION_EXCLUDE' | 'TOOLKIT_EXCLUDE';
  mostRecentFocusOwner?: Component;
  mouseListeners?: MouseListener[];
  mouseMotionListeners?: MouseMotionListener[];
  mousePosition?: Point;
  mouseWheelListeners?: MouseWheelListener[];
  name?: string;
  opacity?: number;
  opaque?: boolean;
  ownedWindows?: Window[];
  owner?: Window;
  parent?: Container;
  peer?: ComponentPeer;
  preferredSize?: Dimension;
  preferredSizeSet?: boolean;
  propertyChangeListeners?: PropertyChangeListener[];
  shape?: Shape;
  showing?: boolean;
  size?: Dimension;
  toolkit?: Toolkit;
  treeLock?: Record<string, unknown>;
  type?: 'NORMAL' | 'UTILITY' | 'POPUP';
  valid?: boolean;
  validateRoot?: boolean;
  warningString?: string;
  width?: number;
  windowFocusListeners?: WindowFocusListener[];
  windowListeners?: WindowListener[];
  windowStateListeners?: WindowStateListener[];
  x?: number;
  y?: number;
};

export type WindowFocusListener = object;

export type WindowListener = object;

export type WindowStateListener = object;
