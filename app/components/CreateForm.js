'use client'

import { useFormState } from 'react-dom';
import { createSlot } from '../lib/actions';

export default function CreateForm() {
  const [errorMessage, dispatch] = useFormState(createSlot, undefined);
  
  return (
    <>
      <span>{errorMessage}</span>
      <form 
        action={dispatch}
        className="flex-col create-form"
      >
        <label htmlFor="site">Site</label>
        <select id="site" name="site" required>
            <option value="Site A">Site A</option>
            <option value="Site B">Site B</option>
            <option value="Site C">Site C</option>
        </select>
        <label htmlFor="specialty">Specialty</label>
        <select id="specialty" name="specialty" required>
            <option value="Cardiology">Cardiology</option>
            <option value="Emergency Medicine">Emergency Medicine</option>
            <option value="General Surgery">General Surgery</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Vascular Surgery">Vascular Surgery</option>
            <option value="General Medicine">General Medicine</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Rheumatology">Rheumatology</option>
            <option value="Respiratory Medicine">Respiratory Medicine</option>
            <option value="Oncology">Oncology</option>
            <option value="Elderly Medicine">Elderly Medicine</option>
            <option value="Midwifery">Midwifery</option>
            <option value="Obstetrics">Obstetrics</option>
            <option value="Neurology">Neurology</option>
            <option value="Stroke">Stroke</option>
            <option value="Gynaecology">Gynaecology</option>
            <option value="Endocrinology">Endocrinology</option>
        </select>         
        <label htmlFor="ward">Ward</label>
        <select id="ward" name="ward" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
        </select>
        <label htmlFor="startDate">Start date</label>
        <input id="startDate" name="startDate" type="date" required />
        <label htmlFor="endDate">End date</label>
        <input id="endDate" name="endDate"type="date" required />
        <label htmlFor="slotStartTime">Slot start time</label>
        <input id="slotStartTime" name="slotStartTime" type="time" required />
        <label htmlFor="slotEndTime">Slot end time</label>
        <input id="slotEndTime" name="slotEndTime" type="time" required />
        <label htmlFor="staffCount">Staff needed</label>
        <input id="staffCount" name="staffCount" type="number" min="1" placeholder="1" required />
        <button>Create</button>
      </form>
    </>
  )
}