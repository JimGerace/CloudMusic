import Vue from 'vue'
import { Aside, Backtop, Button, Carousel, CarouselItem, Container, Dialog, Form, FormItem, Header, Image, Input, Main, Menu, MenuItem, MenuItemGroup, Message, MessageBox, Pagination, Popover, Slider, Submenu, Table, TableColumn, TabPane, Tabs, Tag } from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Image)
Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(Slider)
Vue.use(Backtop)
