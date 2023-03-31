<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\amarpay;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::post('/success',[amarpay::class,'success']);
Route::post('/rechargesuccess',[amarpay::class,'recharge_success']);

?>