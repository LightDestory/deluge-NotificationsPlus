/**
 * notifications.js
 *
 * Copyright (c) Omar Alvarez 2014 <omar.alvarez@udc.es>
 *
 * This file is part of Deluge and is licensed under GNU General Public License 3.0, or later, with
 * the additional special exception to link portions of this program with the OpenSSL library.
 * See LICENSE for more details.
 *
 */

Ext.ns('Deluge.ux.preferences');

/**
 * @class Deluge.ux.preferences.NotificationsPage
 * @extends Ext.Panel
 */
Deluge.ux.preferences.NotificationsPage = Ext.extend(Ext.Panel, {
    title: _('NotificationsPlus'),
    header: false,
    layout: 'fit',
    border: false,

    initComponent: function () {
        Deluge.ux.preferences.NotificationsPage.superclass.initComponent.call(
            this
        );

        this.emailNotiFset = new Ext.form.FieldSet({
            xtype: 'fieldset',
            border: false,
            title: _('Email Notifications'),
            autoHeight: true,
            defaultType: 'textfield',
            style: 'margin-top: 3px; margin-bottom: 0px; padding-bottom: 0px;',
            width: '85%',
            labelWidth: 1,
        });

        this.chkEnableEmail = this.emailNotiFset.add({
            fieldLabel: '',
            labelSeparator: '',
            name: 'enable_email',
            xtype: 'checkbox',
            boxLabel: _('Enabled'),
            listeners: {
                check: function (object, checked) {
                    this.setSmtpDisabled(!checked);
                },
                scope: this,
            },
        });

        this.hBoxHost = this.emailNotiFset.add({
            fieldLabel: '',
            labelSeparator: '',
            name: 'host',
            xtype: 'container',
            layout: 'hbox',
            disabled: true,
            items: [
                {
                    xtype: 'label',
                    text: _('Hostname:'),
                    margins: '6 0 0 6',
                },
                {
                    xtype: 'textfield',
                    margins: '2 0 0 4',
                },
            ],
        });

        this.hBoxPort = this.emailNotiFset.add({
            fieldLabel: '',
            labelSeparator: '',
            name: 'port',
            xtype: 'container',
            layout: 'hbox',
            disabled: true,
            items: [
                {
                    xtype: 'label',
                    text: _('Port:'),
                    margins: '6 0 0 6',
                },
                {
                    xtype: 'spinnerfield',
                    margins: '2 0 0 34',
                    width: 64,
                    decimalPrecision: 0,
                    minValue: 0,
                    maxValue: 65535,
                },
            ],
        });

        this.hBoxUser = this.emailNotiFset.add({
            fieldLabel: '',
            labelSeparator: '',
            name: 'username',
            xtype: 'container',
            layout: 'hbox',
            disabled: true,
            items: [
                {
                    xtype: 'label',
                    text: _('Username:'),
                    margins: '6 0 0 6',
                },
                {
                    xtype: 'textfield',
                    margins: '2 0 0 3',
                },
            ],
        });

        this.hBoxPassword = this.emailNotiFset.add({
            fieldLabel: '',
            labelSeparator: '',
            name: 'password',
            xtype: 'container',
            layout: 'hbox',
            disabled: true,
            items: [
                {
                    xtype: 'label',
                    text: _('Password:'),
                    margins: '6 0 0 6',
                },
                {
                    xtype: 'textfield',
                    inputType: 'password',
                    margins: '2 0 0 5',
                },
            ],
        });

        this.hBoxFrom = this.emailNotiFset.add({
            fieldLabel: '',
            labelSeparator: '',
            name: 'from',
            xtype: 'container',
            layout: 'hbox',
            disabled: true,
            items: [
                {
                    xtype: 'label',
                    text: _('From:'),
                    margins: '6 0 0 6',
                },
                {
                    xtype: 'textfield',
                    margins: '2 0 0 28',
                },
            ],
        });

        this.chkTLS = this.emailNotiFset.add({
            fieldLabel: '',
            labelSeparator: '',
            name: 'enable_tls_ssl',
            xtype: 'checkbox',
            disabled: true,
            boxLabel: _('Server requires TLS/SSL'),
        });

        this.recipientsFset = new Ext.form.FieldSet({
            xtype: 'fieldset',
            border: false,
            title: _('Recipients'),
            autoHeight: true,
            defaultType: 'editorgrid',
            style: 'margin-top: 3px; margin-bottom: 0px; padding-bottom: 0px;',
            autoWidth: true,
            items: [
                {
                    fieldLabel: '',
                    name: 'recipients',
                    margins: '2 0 5 5',
                    height: 130,
                    hideHeaders: true,
                    width: 260,
                    disabled: true,
                    autoExpandColumn: 'recipient',
                    bbar: {
                        items: [
                            {
                                text: _('Add'),
                                iconCls: 'icon-add',
                                handler: this.onAddClick,
                                scope: this,
                            },
                            {
                                text: _('Remove'),
                                iconCls: 'icon-remove',
                                handler: this.onRemoveClick,
                                scope: this,
                            },
                        ],
                    },
                    viewConfig: {
                        emptyText: _('Add an recipient...'),
                        deferEmptyText: false,
                    },
                    colModel: new Ext.grid.ColumnModel({
                        columns: [
                            {
                                id: 'recipient',
                                header: _('Recipient'),
                                dataIndex: 'recipient',
                                sortable: true,
                                hideable: false,
                                editable: true,
                                editor: {
                                    xtype: 'textfield',
                                },
                            },
                        ],
                    }),
                    selModel: new Ext.grid.RowSelectionModel({
                        singleSelect: false,
                        moveEditorOnEnter: false,
                    }),
                    store: new Ext.data.ArrayStore({
                        autoDestroy: true,
                        fields: [{ name: 'recipient' }],
                    }),
                    listeners: {
                        afteredit: function (e) {
                            e.record.commit();
                        },
                    },
                    setEmptyText: function (text) {
                        if (this.viewReady) {
                            this.getView().emptyText = text;
                            this.getView().refresh();
                        } else {
                            Ext.apply(this.viewConfig, { emptyText: text });
                        }
                    },
                    loadData: function (data) {
                        this.getStore().loadData(data);
                        if (this.viewReady) {
                            this.getView().updateHeaders();
                        }
                    },
                },
            ],
        });

        this.edGridSubs = new Ext.grid.EditorGridPanel({
            xtype: 'editorgrid',
            autoHeight: true,
            autoExpandColumn: 'event',
            viewConfig: {
                emptyText: _('Loading events...'),
                deferEmptyText: false,
            },
            colModel: new Ext.grid.ColumnModel({
                defaults: {
                    renderer: function (
                        value,
                        meta,
                        record,
                        rowIndex,
                        colIndex,
                        store
                    ) {
                        if (Ext.isNumber(value) && parseInt(value) !== value) {
                            return value.toFixed(6);
                        } else if (Ext.isBoolean(value)) {
                            return (
                                '<div class="x-grid3-check-col' +
                                (value ? '-on' : '') +
                                '" style="width: 20px;">&#160;</div>'
                            );
                        }
                        return value;
                    },
                },
                columns: [
                    {
                        id: 'event',
                        header: 'Event',
                        dataIndex: 'event',
                        sortable: true,
                        hideable: false,
                    },
                    {
                        id: 'email',
                        header: _('Email'),
                        dataIndex: 'email',
                        sortable: true,
                        hideable: false,
                        menuDisabled: true,
                        width: 40,
                    },
                    {
                        id: 'telegram',
                        header: _('Telegram'),
                        dataIndex: 'telegram',
                        sortable: true,
                        hideable: false,
                        menuDisabled: true,
                        width: 70,
                    },
                ],
            }),
            store: new Ext.data.ArrayStore({
                autoDestroy: true,
                fields: [
                    {
                        name: 'event',
                    },
                    {
                        name: 'email',
                    },
                    {
                        name: 'telegram',
                    },
                ],
            }),
            listeners: {
                cellclick: function (grid, rowIndex, colIndex, e) {
                    var record = grid.getStore().getAt(rowIndex);
                    var field = grid.getColumnModel().getDataIndex(colIndex);
                    var value = record.get(field);

                    if (colIndex != 0) {
                        if (Ext.isBoolean(value)) {
                            record.set(field, !value);
                            record.commit();
                        }
                    }
                },
                beforeedit: function (e) {
                    if (Ext.isBoolean(e.value)) {
                        return false;
                    }

                    return e.record.get('enabled');
                },
                afteredit: function (e) {
                    e.record.commit();
                },
            },
            setEmptyText: function (text) {
                if (this.viewReady) {
                    this.getView().emptyText = text;
                    this.getView().refresh();
                } else {
                    Ext.apply(this.viewConfig, { emptyText: text });
                }
            },
            setSub: function (keys, emails, telegrams) {
                var store = this.getStore();
                keys.forEach(element => {
                    var index = store.find('event', element);
                    emailStatus = emails.includes(element) ? true : false;
                    telegramStatus = telegrams.includes(element) ? true : false;
                    store.getAt(index).set('email', emailStatus);
                    store.getAt(index).set('telegram', telegramStatus);
                    store.getAt(index).commit();
                });
            },
            loadData: function (data) {
                this.getStore().loadData(data);
                if (this.viewReady) {
                    this.getView().updateHeaders();
                }
            },
        });

        this.tgNotiFset = new Ext.form.FieldSet({
            xtype: 'fieldset',
            border: false,
            title: _('Telegram Notifications'),
            autoHeight: true,
            defaultType: 'textfield',
            style: 'margin-top: 3px; margin-bottom: 0px; padding-bottom: 0px;',
            width: '85%',
            labelWidth: 1,
        });

        this.chkEnableTG = this.tgNotiFset.add({
            fieldLabel: '',
            labelSeparator: '',
            name: 'enable_tg',
            xtype: 'checkbox',
            boxLabel: _('Enabled'),
            listeners: {
                check: function (object, checked) {
                    this.setTGDisabled(!checked);
                },
                scope: this,
            },
        });

        this.botToken = this.tgNotiFset.add({
            fieldLabel: '',
            labelSeparator: '',
            name: 'bot_token',
            xtype: 'container',
            layout: 'hbox',
            disabled: true,
            items: [
                {
                    xtype: 'label',
                    text: _('Bot Token:'),
                    margins: '6 0 0 6',
                },
                {
                    xtype: 'textfield',
                    margins: '2 0 0 4',
                },
            ],
        });

        this.chatID = this.tgNotiFset.add({
            fieldLabel: '',
            labelSeparator: '',
            name: 'chat_id',
            xtype: 'container',
            layout: 'hbox',
            disabled: true,
            items: [
                {
                    xtype: 'label',
                    text: _('Chat ID:'),
                    margins: '6 0 0 6',
                },
                {
                    xtype: 'textfield',
                    margins: '2 0 0 4',
                },
            ],
        });

        this.tabPanSettings = this.add({
            xtype: 'tabpanel',
            activeTab: 0,
            items: [
                {
                    title: _('Settings'),
                    items: [this.emailNotiFset, this.recipientsFset, this.tgNotiFset],
                    autoScroll: true,
                },
                {
                    title: _('Subscriptions'),
                    items: this.edGridSubs,
                },
            ],
        });

        this.on('show', this.updateConfig, this);
    },

    updateConfig: function () {
        deluge.client.notificationsplus.get_handled_events({
            success: function (events) {
                var data = [];
                var keys = Ext.keys(events);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    data.push([events[key][0], false]);
                }
                this.edGridSubs.loadData(data);
            },
            scope: this,
        });
        deluge.client.notificationsplus.get_config({
            success: function (config) {
                this.chkEnableEmail.setValue(config['smtp_enabled']);
                this.chkEnableTG.setValue(config['tg_enabled']);
                this.setSmtpDisabled(!config['smtp_enabled']);
                this.setTGDisabled(!config['tg_enabled']);

                this.hBoxHost.getComponent(1).setValue(config['smtp_host']);
                this.hBoxPort.getComponent(1).setValue(config['smtp_port']);
                this.hBoxUser.getComponent(1).setValue(config['smtp_user']);
                this.hBoxPassword.getComponent(1).setValue(config['smtp_pass']);
                this.hBoxFrom.getComponent(1).setValue(config['smtp_from']);
                this.chkTLS.setValue(config['smtp_tls']);

                this.botToken.getComponent(1).setValue(config['tg_bot_token']);
                this.chatID.getComponent(1).setValue(config['tg_chat_id']);

                var data = [];
                var keys = Ext.keys(config['smtp_recipients']);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    data.push([config['smtp_recipients'][key]]);
                }
                this.recipientsFset.getComponent(0).loadData(data);

                data = [];
                emailKeys = Ext.values(config['subscriptions']['email']);
                telegramKeys = Ext.values(config['subscriptions']['telegram']);
                keys = [...new Set([...emailKeys,...telegramKeys])]
                this.edGridSubs.setSub(keys, emailKeys, telegramKeys)
            },
            scope: this,
        });
    },

    onApply: function () {
        var config = {};

        config['smtp_enabled'] = this.chkEnableEmail.getValue();
        config['smtp_host'] = this.hBoxHost.getComponent(1).getValue();
        config['smtp_port'] = Number(this.hBoxPort.getComponent(1).getValue());
        config['smtp_user'] = this.hBoxUser.getComponent(1).getValue();
        config['smtp_pass'] = this.hBoxPassword.getComponent(1).getValue();
        config['smtp_from'] = this.hBoxFrom.getComponent(1).getValue();
        config['smtp_tls'] = this.chkTLS.getValue();

        config['tg_enabled'] = this.chkEnableTG.getValue();
        config['tg_bot_token'] = this.botToken.getComponent(1).getValue();
        config['tg_chat_id'] = this.chatID.getComponent(1).getValue();

        var recipientsList = [];
        var store = this.recipientsFset.getComponent(0).getStore();

        for (var i = 0; i < store.getCount(); i++) {
            var record = store.getAt(i);
            var recipient = record.get('recipient');
            recipientsList.push(recipient);
        }

        config['smtp_recipients'] = recipientsList;

        var subscriptions = {};
        var emailEventList = [];
        var telegramEventList = [];
        store = this.edGridSubs.getStore();

        for (var i = 0; i < store.getCount(); i++) {
            var record = store.getAt(i);
            var ev = record.get('event');
            var email = record.get('email');
            var telegram = record.get('telegram')
            if (email) {
                emailEventList.push(ev);
            }
            if (telegram) {
                telegramEventList.push(ev);
            }
        }

        subscriptions['email'] = emailEventList;
        subscriptions['telegram'] = telegramEventList;
        config['subscriptions'] = subscriptions;

        deluge.client.notificationsplus.set_config(config);
    },

    onOk: function () {
        this.onApply();
    },

    onAddClick: function () {
        var store = this.recipientsFset.getComponent(0).getStore();
        var Recipient = store.recordType;
        var i = new Recipient({
            recipient: '',
        });
        this.recipientsFset.getComponent(0).stopEditing();
        store.insert(0, i);
        this.recipientsFset.getComponent(0).startEditing(0, 0);
    },

    onRemoveClick: function () {
        var selections = this.recipientsFset
            .getComponent(0)
            .getSelectionModel()
            .getSelections();
        var store = this.recipientsFset.getComponent(0).getStore();

        this.recipientsFset.getComponent(0).stopEditing();
        for (var i = 0; i < selections.length; i++) store.remove(selections[i]);
        store.commitChanges();
    },

    setSmtpDisabled: function (disable) {
        this.hBoxHost.setDisabled(disable);
        this.hBoxPort.setDisabled(disable);
        this.hBoxUser.setDisabled(disable);
        this.hBoxPassword.setDisabled(disable);
        this.hBoxFrom.setDisabled(disable);
        this.chkTLS.setDisabled(disable);
        this.recipientsFset.getComponent(0).setDisabled(disable);
    },

    setTGDisabled: function (disable) {
        this.botToken.setDisabled(disable);
        this.chatID.setDisabled(disable);
    },

    onDestroy: function () {
        deluge.preferences.un('show', this.updateConfig, this);

        Deluge.ux.preferences.NotificationsPage.superclass.onDestroy.call(this);
    },
});

Deluge.plugins.NotificationsPlusPlugin = Ext.extend(Deluge.Plugin, {
    name: 'NotificationsPlus',

    onDisable: function () {
        deluge.preferences.removePage(this.prefsPage);
    },

    onEnable: function () {
        this.prefsPage = deluge.preferences.addPage(
            new Deluge.ux.preferences.NotificationsPage()
        );
    },
});

Deluge.registerPlugin('NotificationsPlus', Deluge.plugins.NotificationsPlusPlugin);
