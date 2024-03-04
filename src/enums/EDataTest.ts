export enum EDataTest {
    interface_language_selector,
    interface_language_selector_item,

    landing_layout,
    landing_sign_in_button,
    landing_sign_up_button,
    landing_go_to_workspace_button,

    authentication_modal,
    authentication_modal_email,
    authentication_modal_password,
    authentication_modal_sign_in_tab,
    authentication_modal_sign_up_tab,
    authentication_modal_action_button,
    authentication_modal_error,
    authentication_modal_provider,

    workspace_content,
    workspace_navigation_item,
    workspace_header_user_avatar,
    workspace_bottom_menu,
    workspace_bottom_menu_item,

    words_container,
    words_container_header,
    words_container_add_word_button,
    words_container_header_checkbox,
    words_container_header_search,
    words_container_header_status,

    words_creator,
    words_creator_translations,
    words_creator_add_button,

    words_list,
    words_list_loader,
    words_list_item,
    words_list_item_checkbox,
    words_list_item_source_word,
    words_list_item_translations,
    words_list_item_status,
    words_list_item_delete_button,
    words_list_item_edit_translations,
    words_list_item_edit_button,

    office_menu,
    office_profile_email,
}

export enum EDataTestClass {
    app_notifications = 'app-notifications',
    app_dialog = 'n-dialog',
    app_dialog_actions = 'n-dialog__action',
    app_popover = 'n-popover',
    app_checkbox_checked = 'n-checkbox--checked',
    app_checkbox_disabled = 'n-checkbox--disabled',
    app_card_content = 'n-card__content',

    word_status = 'data-test__word_status',

    words_container_header_status = 'data-test__words-container-header-status',
    words_container_header_status_active = 'data-test__words-container-header-status--active',
}

export enum EDataTestAttr {
    test_blackout = '[data-test-blackout]'
}
