export const SHOW_WIDGET_FULL_PAGE = 'SHOW_WIDGET_FULL_PAGE'
export const HIDE_WIDGET_FULL_PAGE = 'HIDE_WIDGET_FULL_PAGE'
export const CLOSE_ERROR = 'CLOSE_ERROR';

export const showWidgetFullPage = (widget, passProps = {}, namespace = null) => ({
  type: SHOW_WIDGET_FULL_PAGE,
  payload: {
    widget,
    passProps,
    namespace,
  }
})

export const hideWidgetFullPage = () => ({
  type: HIDE_WIDGET_FULL_PAGE,
})

export const closeErrorMessage = () => ({
  type: CLOSE_ERROR
});
