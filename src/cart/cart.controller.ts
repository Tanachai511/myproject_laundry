import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UseGuards, UseInterceptors } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CreateCartDTO, UpdateCartDTO } from "./cart.dto";
import { Cart } from "./cart.entities";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guards";
import { CartInterceptor } from "./interceptors/cart.interceptor";

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,
        ) {
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CartInterceptor)
    @Get()
    getIndex(@Req() request: Request,@Request() {user}: any): Promise<Cart[]> {
        return this.cartService.findAll(user);
    }

    @Get('admin')
    async getcart(@Req() request: Request): Promise<Cart[]> {
    return this.cartService.findAllCart();
    }

    @UseGuards(JwtAuthGuard)  
    @Get(':cartID')
    getCatById(@Param('cartID') id: number,@Request() {user}: any): Promise<Cart> {
        return this.cartService.findOne(id,user)
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CartInterceptor)
    @Post()
    async postCreate(@Body() createCartDTO: CreateCartDTO,@Request() {user}: any): Promise<any> {
        return this.cartService.create(createCartDTO,user)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':cartID')
    updateCartById(@Param('cartID') id: number, @Body() updateCartDTO: UpdateCartDTO,@Request() {user}: any): Promise<Cart> {
        return this.cartService.update(updateCartDTO,user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':cartID')
    deleteCatById(@Param('cartID') id: number,@Request() {user}: any): string {
        this.cartService.DeleteQueryBuilder(id,user);
        return "OK"
    }
}