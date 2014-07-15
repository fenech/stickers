@extends('layout')

@section('content')
<h2 data-bind="click: toggleAddStickers">Add Stickers</h2>
<form data-bind="submit: add, visible: showAddStickers">
    <input data-bind="value: number, valueUpdate: 'input'" type="number" />
    <button type="submit" data-bind="enable: inRange()">add</button>
</form>

<h2 data-bind="click: toggleMyStickers">My Stickers</h2>
<div data-bind="visible: showMyStickers" class="my-stickers">
    <h3>Got</h3>
    <textarea readonly="true" data-bind="value: got"></textarea>

    <h3>Need</h3>
    <textarea readonly="true" data-bind="value: need"></textarea>

    <h3>Swaps</h3>
    <textarea readonly="true" data-bind="value: swap"></textarea>
</div>

<h2 data-bind="click: toggleTheirStickers">Their Stickers</h2>
<div data-bind="visible: showTheirStickers" class="their-stickers">
    <h3>Got</h3>
    <textarea tabindex="-1" data-bind="value: theirGot"></textarea>

    <h3>Need</h3>
    <textarea tabindex="-1" data-bind="value: theirNeed"></textarea>
</div>

<h2 data-bind="click: togglePotentialSwaps">Potential Swaps</h2>
<div data-bind="visible: showPotentialSwaps" class="potential-swaps">
    <h3>They give you</h3>
    <textarea readonly="true" data-bind="value: swapsForYou"></textarea>

    <h3>You give them</h3>
    <textarea readonly="true" data-bind="value: swapsForThem"></textarea>
</div>

<table data-bind="visible: showTable">
    <thead><tr><td>Number</td><td>Count</td></tr></thead>
    <tbody data-bind="foreach: stickers">
        <tr>
            <td data-bind="text: $index"></td>
            <td data-bind="text: $data"></td>
        </tr>
    </tbody>
</table>

{{ HTML::script('js/underscore.js') }}
{{ HTML::script('js/knockout.js') }}
{{ HTML::script('js/stickers.js') }}
@stop